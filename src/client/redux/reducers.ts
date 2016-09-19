
import { 
  action, 
  LOGIN_ACTION, 
  LOGOUT_ACTION, 
  AUTH_SET_ERROR_MESSAGE, 
  AUTH_CLEAR_ERROR_MESSAGE 
} from './actions';

export interface mgmState {
  auth: {
    loggedIn: boolean
    errorMsg: string
  }
} 

const initialState = {
  auth: {
    loggedIn: false,
    errorMsg: ''
  }
}

export function mgmApp(state = initialState, action: action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return (<any>Object).assign({}, state, {
        auth: {
          loggedIn: true
        }
      })
    case LOGOUT_ACTION:
      return (<any>Object).assign({}, state, {
        auth: {
          loggedIn: false
        }
      })
    case AUTH_CLEAR_ERROR_MESSAGE:
      return (<any>Object).assign({}, state, {
        auth: {
          errorMsg: ''
        }
      })
    case AUTH_SET_ERROR_MESSAGE:
    return (<any>Object).assign({}, state, {
        auth: {
          errorMsg: action.message
        }
      })
    default:
      return state;
  }
}