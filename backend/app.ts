import express from "express"
const cors = require("cors")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
import session from "express-session"
import { prisma } from "./client"

declare module "express-session" {
  interface SessionData {
    userName: string
    password: string
  }
}

export const app: express.Express = express()
app.use(
  cors({
    origin: ["http://127.0.0.1:6006", "http://localhost:3000"],
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200,
  })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60 * 60, // 60分
    },
  })
)

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!")
})

app.get("/validate", async (req: express.Request, res: express.Response) => {
  if (!req.query.value) return res.json({ result: "success" })
  if (req.query.type !== "email" && req.query.type !== "userName")
    return res.json({ result: "success" })
  const alreadyExistsValue = []

  if (typeof req.query.value !== "string") {
    // req.query.value return type string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]
    throw new Error("req.query.value is not string")
  }
  // validation
  if (req.query.type === "email") {
    const alreadyExistsEmail = await prisma.user.findUnique({
      where: {
        email: req.query.value,
      },
    })
    if (alreadyExistsEmail) alreadyExistsValue.push(alreadyExistsEmail)
  } else if (req.query.type === "userName") {
    const alreadyExistsUserName = await prisma.user.findUnique({
      where: {
        userName: req.query.value,
      },
    })
    if (alreadyExistsUserName) alreadyExistsValue.push(alreadyExistsUserName)
  }

  if (alreadyExistsValue.length !== 0) {
    res.json({
      result: "failure",
      message: "既に登録されています",
    })
  } else {
    res.json({ result: "success" })
  }
})

app.post("/registar", async (req: express.Request, res: express.Response) => {
  const password = bcrypt.hashSync(req.body.password, 10)
  await prisma.user.create({
    data: {
      email: req.body.email,
      fullName: req.body.fullName,
      userName: req.body.userName,
      password: password,
    },
  })
  req.session.userName = req.body.userName
  res.json({
    result: "success",
  })
})

app.post("/login", async (req: express.Request, res: express.Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })
  if (user === null) {
    res.json({
      result: "failure",
    })
    return
  }

  const compared = await bcrypt.compare(req.body.password, user.password)
  if (compared) {
    req.session.userName = user.userName
    res.json({
      result: "success",
    })
  } else {
    res.json({
      result: "failure",
    })
  }
})

app.get("/profile", async (req: express.Request, res: express.Response) => {
  if (req.session.userName) {
    const user = await prisma.user.findUnique({
      where: {
        userName: req.session.userName,
      },
    })
    if (!user) throw new Error("user does not exist")

    res.json({
      result: "session_exists",
      user: {
        email: user.email,
        fullName: user.fullName,
        userName: user.userName,
      },
    })
  } else {
    res.json({
      result: "no_session",
    })
  }
})
