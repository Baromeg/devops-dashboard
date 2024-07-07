import React, { useEffect, useState } from 'react'
import { EndpointData } from './types'
import './index.css'
import config from './config'

const apiUrl = config.apiUrl

const App: React.FC = () => {
  const [data, setData] = useState<EndpointData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const delay = 2000 // 2 seconds delay

    const timeoutId = setTimeout(() => {
      const ws = new WebSocket(`ws://${apiUrl}/websocket`)

      ws.onopen = () => {
        console.log('WebSocket connection opened')
      }

      ws.onmessage = (event) => {
        try {
          console.log('Received data:', event.data)
          const parsedData = JSON.parse(event.data)
          setData(parsedData)
          setLoading(false)
          setError(null)
        } catch (e) {
          console.error('Error parsing JSON:', e)
          setError('Error parsing data from server')
          setLoading(false)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setError('WebSocket error')
        setLoading(false)
      }

      ws.onclose = () => {
        console.log('WebSocket connection closed')
      }

      return () => {
        ws.close()
      }
    }, delay)
    // Clean up the timeout if the component unmounts before the delay
    return () => clearTimeout(timeoutId)
  }, [])

  // Calculate best and worst performing servers
  const sortedServers = [...data].sort(
    (a, b) => a.results.stats.server.cpu_load - b.results.stats.server.cpu_load
  )
  const bestPerforming = sortedServers.slice(0, 2)
  const worstPerforming = sortedServers.slice(-2).reverse()

  return (
    <div className='max-h-screen flex flex-col text-white bg-gray-900'>
      <header className='p-2'>
        <h1 className='text-3xl font-bold text-center text-neon-blue '>
          DevOps Dashboard
        </h1>
      </header>
      <div className='flex-grow flex flex-col'>
        {loading ? (
          <div className='flex-grow flex items-center justify-center'>
            <div className='loader'></div>
          </div>
        ) : (
          <>
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <div className='flex-grow flex flex-col md:flex-row gap-2 p-2'>
              <div className='flex-1 p-4 border rounded-lg shadow-sm bg-gray-800'>
                <h3 className='text-xl font-semibold mb-2 text-neon-green text-center'>
                  Top Performers
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {bestPerforming.map((server, index) => (
                    <div key={index} className='text-center'>
                      <strong>{server.region.toUpperCase()}</strong>
                      <ul className='list-disc list-inside'>
                        <li>
                          CPU Load: {server.results.stats.server.cpu_load}
                        </li>
                        <li>
                          Active Connections:{' '}
                          {server.results.stats.server.active_connections}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex-1 p-4 border rounded-lg shadow-sm bg-gray-800'>
                <h3 className='text-xl font-semibold mb-2 text-neon-red text-center'>
                  Low Performers
                </h3>
                <div className='grid grid-cols-2 gap-4'>
                  {worstPerforming.map((server, index) => (
                    <div key={index} className='text-center'>
                      <strong>{server.region.toUpperCase()}</strong>
                      <ul className='list-disc list-inside'>
                        <li>
                          CPU Load: {server.results.stats.server.cpu_load}
                        </li>
                        <li>
                          Active Connections:{' '}
                          {server.results.stats.server.active_connections}
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 overflow-y-auto'>
              {data
                .sort((a, b) => a.region.localeCompare(b.region))
                .map((endpoint, index) => {
                  const { status, region, results } = endpoint
                  const { servers_count, online, server } = results.stats
                  const topKeys = server.workers
                    .find(([workerName]) => workerName === 'io')?.[1]
                    .top_keys.slice(0, 3)
                  const blockedKeys = server.workers.find(
                    ([workerName]) => workerName === 'io'
                  )?.[1].recently_blocked_keys

                  return (
                    <div
                      key={index}
                      className='p-2 border rounded-lg shadow-sm bg-gray-800'
                    >
                      <h2 className='text-xl font-semibold text-neon-blue text-center'>
                        {region.toUpperCase()}
                      </h2>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col items-center justify-center'>
                          <p
                            className={`mt-2 text-lg ${
                              status === 'ok'
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {status.toUpperCase()}
                          </p>
                          <p className='mt-2 text-gray-400'>
                            Servers Count: {servers_count}
                          </p>
                          <p className='mt-2 text-gray-400'>
                            Online Users: {online}
                          </p>
                          <p className='mt-2 text-gray-400'>
                            Active Connections: {server.active_connections}
                          </p>
                          <p className='mt-2 text-gray-400'>
                            CPU Load: {server.cpu_load}
                          </p>
                        </div>
                        <div className='flex flex-col items-start justify-center'>
                          <h3 className='mt-4 text-lg font-semibold text-neon-green '>
                            Top IO Keys
                          </h3>
                          <ul className='mt-2 list-disc list-inside text-gray-300'>
                            {topKeys ? (
                              topKeys.map(([key, value], idx) => (
                                <li key={idx} className='break-words'>
                                  {key.split('').reduce((acc, char, index) => {
                                    console.log({ acc })

                                    return index % 10 === 0
                                      ? `${acc}`
                                      : `${acc}${char}`
                                  }, '')}
                                  : {value.toFixed(2)}
                                </li>
                              ))
                            ) : (
                              <li>No top keys available</li>
                            )}
                          </ul>
                          <h3 className='mt-4 text-lg font-semibold text-neon-yellow'>
                            Blocked Keys
                          </h3>
                          <ul className='mt-2 list-disc list-inside text-gray-300'>
                            {blockedKeys ? (
                              blockedKeys.map(
                                ([key, count, timestamp], idx) => (
                                  <li key={idx}>
                                    {key} (count: {count}, time:{' '}
                                    {new Date(timestamp).toLocaleString()})
                                  </li>
                                )
                              )
                            ) : (
                              <li>No blocked keys</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
