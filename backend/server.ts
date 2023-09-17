import { app } from "./app"

const port = 8000

app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`)
})
