import { NextApiRequest, NextApiResponse } from "next"

import cors from "../../../lib/cors"
import db from "../index"
import { hasDuplicates } from "./utils"

type IDProps = {
  collection: string
  primaryKey?: string
  uniqueFields?: string[]
}
export const id = async (
  { collection, primaryKey = "id", uniqueFields }: IDProps,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const pk = req.query[primaryKey].toString()

  // Run cors
  await cors(req, res, {
    // Only allow requests for ...
    methods: ["GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })

  // some requests might include "_action: string" (i.e "_action:like" and "_action:dislike")
  // and we don't want to save that field in db. Therefore, remove any fields starting with "_"
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    const key = Object.keys(req.body)[i]
    if (/^_/.test(key)) {
      delete req.body[key]
    }
  }

  try {
    if (req.method === "PUT") {
      const containsDuplicatesMsg = await hasDuplicates(collection, uniqueFields, req)
      if (containsDuplicatesMsg) {
        return res.status(422).json({
          message: containsDuplicatesMsg,
        })
      }

      await db
        .collection(collection)
        .doc(pk)
        .update({
          ...req.body,
          updated: new Date().toISOString(),
        })
    } else if (req.method === "PATCH") {
      const containsDuplicatesMsg = await hasDuplicates(collection, uniqueFields, req)
      if (containsDuplicatesMsg) {
        return res.status(422).json({
          message: containsDuplicatesMsg,
        })
      }

      await db
        .collection(collection)
        .doc(pk)
        .update({
          ...req.body,
          updated: new Date().toISOString(),
        })
    } else if (req.method === "GET") {
      const doc = await db.collection(collection).doc(pk).get()
      if (!doc.exists) {
        return res.status(404).json({
          message: "Not Found",
        })
      }
      return res.status(200).json({
        id: doc.id,
        ...doc.data(),
      })
    } else if (req.method === "DELETE") {
      await db.collection(collection).doc(pk).delete()
    }
    res.status(200).json({})
  } catch (err) {
    console.error(err)
    res.status(400).json({
      message: "Server error",
    })
  }

  return undefined
}
