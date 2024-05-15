const express = require("express")

const runServer = (port = 3001) => {
  const server = express()
  server.use(express.json())

  // Define a simple route to check server status
  server.get("/", async (req, res) => {
    res.status(200).send({ message: "Im working!" })
  })

  // Error handling middleware
  server.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
  })

  // Start the server
  server.listen(port, () => console.log("Server working on port", port))
}

module.exports = runServer
