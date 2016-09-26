import { Action, combineReducers } from 'redux';

import { Host, Region } from '../../common/messages'

import {
  NavigateTo,
  LoginAction,
  SetAuthMessage,
  UpsertHost,
  UpsertRegion,
  UpsertUser
} from './actions';
import { Actions} from './types';
import { User } from '../../common/messages';
import { mgmState } from './model';

const initialState = {
  auth: {
    loggedIn: false
  },
  url: window.location.href
}

function auth(state = { loggedIn: false }, action: Action) {
  switch (action.type) {
    case Actions.LOGIN:
      let act = <LoginAction>action;
      return (<any>Object).assign({}, state, {
        loggedIn: true,
        user: act.user
      })
    case Actions.LOGOUT:
      return (<any>Object).assign({}, state, {
        loggedIn: false,
        user: null
      })
    case Actions.AUTH_SET_ERROR_MESSAGE:
      let aca = <SetAuthMessage>action;
      return (<any>Object).assign({}, state, {
        errorMsg: aca.message
      })
    default: return state;
  }
}

function url(state = "/", action: Action) {
  switch (action.type) {
    case Actions.NAVIGATE_TO:
      let act = <NavigateTo>action;
      if (act.url === state) return state;
      return act.url
    default:
      return state;
  }
}

function hosts(state: { [key: number]: Host } = {}, action: Action) {
  switch (action.type) {
    case Actions.UPSERT_HOST:
      let act = <UpsertHost>action;
      return (<any>Object).assign({}, state, {
        [act.host.id]: (<any>Object).assign({}, state[act.host.id], act.host)
      });
    default:
      return state;
  }
}

function regions(state: { [key: string]: Region } = {}, action: Action) {
  switch (action.type) {
    case Actions.UPSERT_REGION:
      let act = <UpsertRegion>action;
      if(! act.region){
        console.log(act);
      }
      return (<any>Object).assign({}, state, {
        [act.region.uuid]: (<any>Object).assign({}, state[act.region.uuid], act.region)
      });
    default:
      return state;
  }
}

function users(state: { [key: string]: User } = {}, action: Action) {
  switch (action.type) {
    case Actions.UPSERT_USER:
      let act = <UpsertUser>action;
      if(! act.user){
        console.log(act);
      }
      return (<any>Object).assign({}, state, {
        [act.user.uuid]: (<any>Object).assign({}, state[act.user.uuid], act.user)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers<mgmState>({
  "auth": auth,
  "url": url,
  "hosts": hosts,
  "regions": regions,
  "users": users
});

export default rootReducer;