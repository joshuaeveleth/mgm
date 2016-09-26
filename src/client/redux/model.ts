
import { Host, Region, User } from '../../common/messages'

export interface mgmState {
  auth: {
    loggedIn: boolean
    user: LoginUser
    token: string
    errorMsg: string
  }
  url: string
  hosts:  { [key: number]: Host }
  regions:  { [key: string]: Region }
  users:  { [key: string]: User }
}

export interface LoginUser {
  uuid: string
  name: string
  email: string
  godLevel: number
  token: string
}