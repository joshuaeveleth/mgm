
import { action, LOGIN_ACTION, LOGOUT_ACTION } from './actions';

const initialState = {
  auth: {
    loggedIn: false,
    errorMsg: ''
  }
}

export function mgmState(state = initialState, action: action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return (<any>Object).assign({}, state, {
        authenticated: true
      })
    case LOGOUT_ACTION:
      return (<any>Object).assign({}, state, {
        authenticated: false
      })
    default:
      return state;
  }
}