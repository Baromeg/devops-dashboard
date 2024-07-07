export interface EndpointStatus {
  status: string
  details: string
  timestamp: string
}

export interface EndpointData {
  endpoint: string
  status: EndpointStatus
}
