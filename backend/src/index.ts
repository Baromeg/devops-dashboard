import express from 'express'
import { Server } from 'http'
import { setupWebSocket } from './wsService'

export const app = express()
const port = process.env.PORT || 4000

app.get('/websocket', (req, res) => {
  res.send('WebSocket server is running')
})

let server: Server
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
    setupWebSocket(server)
  })
}

export { server }
