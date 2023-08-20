import { PrismaClient } from "@prisma/client"
import express from "express"
const cors = require("cors")

const app: express.Express = express()
const port = 8000
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200,
  })
)

const prisma = new PrismaClient()

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!")
})

app.get("/api", (req: express.Request, res: express.Response) => {
  res.json([
    {
      id: 1,
      name: "りんご",
      price: 200,
      image: "https://source.unsplash.com/gDPaDDy6_WE",
    },
    {
      id: 2,
      name: "バナナ",
      price: 300,
      image: "https://source.unsplash.com/zrF6ACPLhPM",
    },
    {
      id: 3,
      name: "みかん",
      price: "150",
      image: "https://source.unsplash.com/bogrLtEaJ2Q",
    },
    {
      id: 4,
      name: "メロン",
      price: "2000",
      image: "https://source.unsplash.com/8keUtGmy0xo",
    },
  ])
})

app.get("/validate", async (req: express.Request, res: express.Response) => {
  if (req.query.type === "email") {
    if (!req.query.value) return res.json({ result: "success" })
    const alreadyExistsEmail = await prisma.user.findUnique({
      where: {
        email: req.query.value as string,
      },
    })
    if (alreadyExistsEmail) {
      res.json({
        result: "failure",
        message: "既に登録されています",
      })
    } else {
      res.json({
        result: "success",
      })
    }
  } else {
    res.json({
      result: "success",
    })
  }
})

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`)
})
