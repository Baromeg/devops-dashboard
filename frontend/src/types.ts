export interface WorkerDetails {
  wait_time: number
  workers: number
  waiting: number
  idle: number
  time_to_return: number
  recently_blocked_keys: [string, number, string][]
  top_keys: [string, number][]
}

export interface ServerStats {
  active_connections: number
  wait_time: number
  workers: [string, WorkerDetails][]
  cpu_load: number
  timers: number
}

export interface Results {
  services: {
    redis: boolean
    database: boolean
  }
  stats: {
    servers_count: number
    online: number
    session: number
    server: ServerStats
  }
}

export interface EndpointData {
  status: string
  region: string
  roles: string[]
  results: Results
  strict: boolean
  server_issue: any
}
