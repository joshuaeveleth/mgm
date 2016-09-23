
import { Host, Region } from '../../common/messages'
import { User } from './types';

export interface mgmState {
  auth: {
    loggedIn: boolean
    user: User
    errorMsg: string
  }
  url: string
  hosts:  { [key: number]: Host }
  regions:  { [key: string]: Region }
}