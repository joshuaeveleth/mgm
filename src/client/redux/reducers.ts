import { Action, combineReducers } from 'redux';

import {
  NavigateTo,
  LoginAction,
  SetAuthMessage
} from './actions';
import * as types from './types';
import { User, mgmState } from './model';

const initialState = {
  auth: {
    loggedIn: false
  },
  url: window.location.href
}

function reduceAuth(state = { loggedIn: false }, action: Action) {
  switch (action.type) {
    case types.LOGIN_ACTION:
      let act = <LoginAction>action;
      return (<any>Object).assign({}, state, {
        loggedIn: true,
        user: act.user
      })
    case types.LOGOUT_ACTION:
      return (<any>Object).assign({}, state, {
        loggedIn: false,
        user: null
      })
    case types.AUTH_SET_ERROR_MESSAGE:
      let aca = <SetAuthMessage>action;
      return (<any>Object).assign({}, state, {
        errorMsg: aca.message
      })
    default: return state;
  }
}

function url(state = "/", action: Action) {
  switch (action.type) {
    case types.NAVIGATE_TO:
      let act = <NavigateTo>action;
      if (act.url === state) return state;
      return act.url
    default:
      return state;
  }
}

const rootReducer = combineReducers<mgmState>({
  "auth": reduceAuth,
  "url": url
});

export default rootReducer;