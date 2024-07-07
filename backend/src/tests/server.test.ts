import { Server } from 'http'
import WebSocket from 'ws'
import request from 'supertest'
import { app } from '../index'
import { closeWebSocket, setupWebSocket } from '../wsService'

let server: Server

beforeAll((done: jest.DoneCallback) => {
  server = app.listen(4000, done)
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
    const ws = new WebSocket('ws://localhost:4000')

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
