
import { Host, Region, User, PendingUser, Group, Membership, Role, Estate, Manager, EstateMap, Job } from '../../common/messages'

export interface mgmState {
  auth: {
    loggedIn: boolean
    user: LoginUser
    token: string
    errorMsg: string
  }
  url: string
  hosts: { [key: number]: Host }
  regions: { [key: string]: Region }
  users: { [key: string]: User },
  pendingUsers: { [key: string]: PendingUser },
  groups: { [key: string]: GroupRecord },
  estates: { [key: number]: EstateRecord },
  jobs: { [key: number]: Job}
}

export interface GroupRecord {
  group: Group,
  members: Membership[],
  roles: Role[]
}

export interface EstateRecord {
  estate: Estate,
  managers: string[],
  regions: string[]
}

export interface LoginUser {
  uuid: string
  name: string
  email: string
  godLevel: number
  token: string
}