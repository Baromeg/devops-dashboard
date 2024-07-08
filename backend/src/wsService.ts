import { Server } from 'http'
import WebSocket from 'ws'
import axios from 'axios'
import { EndpointData } from './types'

const endpoints = [
  'https://data--us-east.upscope.io/status?stats=1',
  'https://data--eu-west.upscope.io/status?stats=1',
  'https://data--eu-central.upscope.io/status?stats=1',
  'https://data--us-west.upscope.io/status?stats=1',
  'https://data--sa-east.upscope.io/status?stats=1',
  'https://data--ap-southeast.upscope.io/status?stats=1'
]

let wss: WebSocket.Server
export function setupWebSocket(server: Server) {
  wss = new WebSocket.Server({ server })

  wss.on('connection', (ws) => {
    console.log('Client connected')

    const fetchAndSendData = async () => {
      try {
        const responses = await Promise.all(
          endpoints.map((url) => axios.get<EndpointData>(url))
        )
        const data = responses.map((response) => response.data)
        const payload = JSON.stringify(data)

        ws.send(payload)
      } catch (error) {
        console.error('Error fetching data', error)
        ws.send(JSON.stringify({ error: 'Error fetching data' }))
      }
    }

    fetchAndSendData()
    const interval = setInterval(fetchAndSendData, 3000)

    ws.on('close', () => {
      clearInterval(interval)
      console.log('Client disconnected')
    })
  })
}

export function closeWebSocket() {
  return new Promise<void>((resolve) => {
    if (wss) {
      wss.clients.forEach((client) => client.close())
      wss.close(() => {
        resolve()
      })
    } else {
      resolve()
    }
  })
}
