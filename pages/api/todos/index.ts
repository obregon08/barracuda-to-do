import dayjs from "dayjs"
import fs from "fs"

const DB_FILE_PATH = `${process.cwd()}/pages/api/todos/todos_db.json`

const route = async (req, res) => {
  const rawData = await readFile(DB_FILE_PATH)
  const data = JSON.parse(rawData)

  if (req.method === "GET") {
    const filtered = data.filter((row) => dayjs(row.dueDate).format("L") === dayjs(req.query.date).format("L"))
    return res.json(filtered)
  }

  if (req.method === "PATCH") {
    return saveToJsonFile(
      data.map((r) => (r.id === req.body.id ? req.body : r)),
      () => {
        res.status(200).json({ message: "Updated" })
      }
    )
  }

  if (req.method === "PUT") {
    return saveToJsonFile([...data, { ...req.body, id: uuidv4() }], () => {
      res.status(200).json({ message: "Created" })
    })
  }

  if (req.method === "DELETE") {
    const toSave = [...data.filter((r) => r.id != req.query.id)]
    return saveToJsonFile(toSave, () => {
      res.status(200).json({ message: "Deleted" })
    })
  }

  return res.status(422).json({}) // unprocessable
}

const readFile = async (filePath): Promise<string> => {
  return new Promise((resolve) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return console.log(err)
      }
      return resolve(data)
    })
  })
}

const saveToJsonFile = (data, callback) => {
  fs.writeFile(DB_FILE_PATH, JSON.stringify(data), callback)
}

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default route
