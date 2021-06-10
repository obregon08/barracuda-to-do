// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import cors from "../../lib/cors"

const route = async (req, res) => {
  // Run cors
  await cors(req, res, {
    methods: ["GET", "OPTIONS"],
  })

  res.statusCode = 200
  res.json({ response: "pong" })
}

export default route
