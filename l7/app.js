const runServer = require("./src/runServer")
const dotenv = require("dotenv")
dotenv.config()

const app = () => {
  const port = process.env.PORT
  runServer(port)
}

app()
