import { Server } from 'http'
import WebSocket from 'ws'
import request from 'supertest'
import { app } from '../index'
import { closeWebSocket, setupWebSocket } from '../wsService'

let server: Server

beforeAll((done: jest.DoneCallback) => {
  server = app.listen(process.env.PORT || 4000, done)
  setupWebSocket(server)
  done()
})

afterAll(async () => {
  await closeWebSocket()
  if (server && server.listening) {
    return new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.log('Error closing server', err)
          reject(err)
        }
        resolve()
      })
    })
  }
})

describe('WebSocket Server', () => {
  it('should accept WebSocket connections', (done: jest.DoneCallback) => {
    const apiUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://devops-dashboard-backend-dca5eea3e154.herokuapp.com'
        : 'http://localhost:4000'
    const wsProtocol = apiUrl.startsWith('https') ? 'wss' : 'ws'
    const ws = new WebSocket(
      `${wsProtocol}://${new URL(apiUrl).host}/websocket`
    )

    ws.on('open', () => {
      ws.close()
      done()
    })

    ws.on('error', (err) => {
      done(err)
    })
  })

  it('should respond to HTTP requests', async () => {
    const response = await request(app).get('/websocket')
    expect(response.status).toBe(200)
    expect(response.text).toBe('WebSocket server is running')
  })
})
