import { NextApiRequest, NextApiResponse } from "next"

import cors from "../../../lib/cors"
import db from "../index"
import { hasDuplicates } from "./utils"

type IndexProps = {
  collection: string
  uniqueFields?: string[]
  limit?: number
  startAfterId?: string
}

export const index = async (
  { collection, startAfterId, limit = 25, uniqueFields }: IndexProps,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  // Run cors
  await cors(req, res, {
    // Only allow requests for ...
    methods: ["GET", "POST", "OPTIONS"],
  })

  // some requests might include "_action: string" (i.e "_action:like" and "_action:dislike")
  // and we don't want to save that field in db. Therefore, remove any fields starting with "_"
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    const key = Object.keys(req.body)[i]
    if (/^_/.test(key)) {
      delete req.body[key]
    }
  }

  if (req.method === "GET") {
    try {
      const sortedRef = db.collection(collection).limit(limit).orderBy("created")
      let rows
      if (startAfterId) {
        const lastSeenDoc = await db.collection(collection).doc(startAfterId).get()
        rows = await sortedRef.startAfter(lastSeenDoc).get()
      } else {
        rows = await sortedRef.get()
      }
      const data = []
      rows.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      res.status(200).json(data || [])
    } catch (err) {
      console.log(err)
      res.status(400).json({
        message: "Server error",
      })
    }
  } else if (req.method === "POST") {
    const containsDuplicatesMsg = await hasDuplicates(collection, uniqueFields, req)
    if (containsDuplicatesMsg) {
      return res.status(422).json({
        message: containsDuplicatesMsg,
      })
    }

    const row = await db.collection(collection).add({
      ...req.body,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    })
    res.status(200).json({
      id: row.id,
    })
  }

  return undefined
}
