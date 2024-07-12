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

let payload: any
let websocketList: WebSocket[] = []

const fetchData = async () => {
  const responses = await Promise.all(
    endpoints.map((url) => axios.get<EndpointData>(url))
  )
  const data = responses.map((response) => response.data)
  payload = JSON.stringify(data)
  websocketList.forEach((websocket) => {
    websocket.send(payload)
  })
}

const interval = setInterval(fetchData, 3000)

let wss: WebSocket.Server

export async function setupWebSocket(server: Server) {
  wss = new WebSocket.Server({ server })

  wss.on('connection', (ws) => {
    console.log('Client connected')
    websocketList.push(ws)

    ws.send(payload)

    ws.on('close', () => {
      console.log('Client disconnected')
      websocketList = websocketList.filter((websocket) => websocket !== ws)
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
