import { Action } from 'redux';
import { User } from "./model";

import * as types from "./types";

export interface LoginAction extends Action {
  user: User
}

export interface SetAuthMessage extends Action {
  message: string
}

export interface NavigateTo extends Action {
  url: string
}


export function createLoginAction(user: User): Action{
  let act: LoginAction = {
    type: types.LOGIN_ACTION,
    user: user
  }
  return act;
}

export function createLogoutAction(): Action{
  return { type: types.LOGOUT_ACTION };
}

export function createSetAuthErrorMessageAction(msg: string): Action{
  let act: SetAuthMessage = {
    type: types.AUTH_SET_ERROR_MESSAGE,
    message: msg
  }
  return act;
}

export function createClearAuthErrorMessageAction(): Action{
  return { type: types.AUTH_CLEAR_ERROR_MESSAGE };
}

export function createNavigateToAction(url: string): Action{
  let act: NavigateTo = {
    type: types.NAVIGATE_TO,
    url: url
  }
  return act;
}