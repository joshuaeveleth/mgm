
import {
  action,
  NAVIGATE_TO,
  LOGIN_ACTION,
  LOGOUT_ACTION,
} from './actions';

export interface User {
  username: string,
  godLevel: number,
  email: string,
  token: string
}

export interface mgmState {
  auth: {
    loggedIn: boolean
    user: User
  }
  url: string
}

const initialState = {
  auth: {
    loggedIn: false
  },
  url: window.location.href
}

export function mgmApp(state = initialState, action: action) {
  switch (action.type) {
    case NAVIGATE_TO:
      if(action.url === state.url) return state;
      return (<any>Object).assign({}, state, {
        url: action.url
      })
    case LOGIN_ACTION:
      return (<any>Object).assign({}, state, {
        auth: {
          loggedIn: true,
          user: action.user
        }
      })
    case LOGOUT_ACTION:
      return (<any>Object).assign({}, state, {
        auth: {
          loggedIn: false,
          user: null
        }
      })
    default:
      return state;
  }
}