
import { User } from "./reducers";

export interface action {
  type: string
  message?: string
  url?: string
  user?: User
}

/** Types */
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const AUTH_SET_ERROR_MESSAGE = 'AUTH_SET_ERROR_MESSAGE';
export const AUTH_CLEAR_ERROR_MESSAGE = 'AUTH_CLEAR_ERROR_MESSAGE';

export const NAVIGATE_TO = 'NAVIGATE_TO';

export function loginAction(user: User){
  return { 
    type: LOGIN_ACTION,
    user: user
  };
}

export function logoutAction(){
  return { type: LOGOUT_ACTION };
}

export function setAuthErrorMessage(msg: string){
  return { type: AUTH_SET_ERROR_MESSAGE, message: msg };
}

export function clearAuthErrorMessage(){
  return { type: AUTH_CLEAR_ERROR_MESSAGE };
}

export function navigateTo(url: string){
  return { type: NAVIGATE_TO, url: url}
}