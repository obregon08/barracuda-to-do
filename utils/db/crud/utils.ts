import { NextApiRequest } from "next"

import db from "../index"

export const hasDuplicates = async (
  collection: string,
  uniqueFields: string[],
  req: NextApiRequest
): Promise<string | void> => {
  if (uniqueFields && uniqueFields.length) {
    if (uniqueFields.length > 10) {
      return `Up to 10 unique fields allowed`
    }

    const collectionRef = db.collection(collection)

    let queryRef
    for (let i = 0; i < uniqueFields.length; i++) {
      if (typeof req.body[uniqueFields[i]] !== "undefined") {
        queryRef = (queryRef || collectionRef).where(uniqueFields[i], "==", req.body[uniqueFields[i]])
      }
    }

    const snapshot = await queryRef.get()
    const data = []
    snapshot.forEach((doc) =>
      data.push({
        id: doc.id,
        ...doc.data(),
      })
    )

    if (data.length) {
      return `Duplicates found. Please check data in unique fields.`
    }
  }

  return undefined
}
