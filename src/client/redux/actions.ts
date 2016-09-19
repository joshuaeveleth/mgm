
export interface action {
  type: string
  message?: string
}

/** Types */
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const AUTH_SET_ERROR_MESSAGE = 'AUTH_SET_ERROR_MESSAGE';
export const AUTH_CLEAR_ERROR_MESSAGE = 'AUTH_CLEAR_ERROR_MESSAGE';

export function loginAction(){
  return { type: LOGIN_ACTION };
}

export function logoutFunction(){
  return { type: LOGOUT_ACTION };
}

export function setAuthErrorMessage(msg: string){
  return { type: AUTH_SET_ERROR_MESSAGE, message: msg };
}

export function clearAuthErrorMessage(){
  return { type: AUTH_CLEAR_ERROR_MESSAGE };
}