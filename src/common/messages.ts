

export interface User {
  uuid: string
  name: string
  email: string
  godLevel: number
}

export interface PendingUser {
  name: string
  email: string
  template: string
  registered: Date
  summary: string
}

export interface Region {
  uuid: string
  name: string
  port: number
  x: number
  y: number
  host: string
}

export interface Estate {
  name: string
  id: number
  owner: string
  managers: string[]
  regions: string[]
}

export interface Host {
  id: number
  address: string
  port: number
  name: string
  slots: number
}