

export interface User {
  uuid: string
  name: string
  email: string
  godLevel: number
}

export interface PendingUser {
  name: string
  email: string
  gender: string
  registered: Date
  summary: string
  password: string
}

export interface Region {
  uuid: string
  name: string
  httpPort: number
  locX: number
  locY: number
  externalAddress: string
  slaveAddress: string
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

export interface Group {
  GroupID: string
  Name: string
  FounderID: string
  OwnerRoleID: string
}

export interface Role {
  GroupID: string
  RoleID: string
  Name: string
  Description: string
  Title: string
  Powers: number
}

export interface Membership {
  GroupID: string
  AgentID: string
  SelectedRoleID: string
}