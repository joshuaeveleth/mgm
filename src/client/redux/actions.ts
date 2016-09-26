import { Action } from 'redux';

import { Actions } from "./types";
import { LoginUser } from './model';

import { Host, Region, User } from '../../common/messages'

export interface LoginAction extends Action {
  user: LoginUser
}

export interface SetAuthMessage extends Action {
  message: string
}

export interface NavigateTo extends Action {
  url: string
}

export interface UpsertRegion extends Action {
  region: Region
}

export interface UpsertHost extends Action {
  host: Host
}

export interface UpsertUser extends Action {
  user: User
}


export function createLoginAction(user: LoginUser): Action {
  let act: LoginAction = {
    type: Actions.LOGIN,
    user: user
  }
  return act;
}

export function createLogoutAction(): Action {
  return { type: Actions.LOGOUT };
}

export function createSetAuthErrorMessageAction(msg: string): Action {
  let act: SetAuthMessage = {
    type: Actions.AUTH_SET_ERROR_MESSAGE,
    message: msg
  }
  return act;
}

export function createClearAuthErrorMessageAction(): Action {
  return { type: Actions.AUTH_CLEAR_ERROR_MESSAGE };
}

export function createNavigateToAction(url: string): Action {
  let act: NavigateTo = {
    type: Actions.NAVIGATE_TO,
    url: url
  }
  return act;
}

export function createUpsertRegionAction(r: Region): Action {
  let act: UpsertRegion = {
    type: Actions.UPSERT_REGION,
    region: r
  }
  return act;
}

export function createUpsertHostAction(h: Host): Action {
  let act: UpsertHost = {
    type: Actions.UPSERT_HOST,
    host: h
  }
  return act;
}

export function createUpsertUserAction(u: User): Action {
  let act: UpsertUser = {
    type: Actions.UPSERT_USER,
    user: u
  }
  return act;
}