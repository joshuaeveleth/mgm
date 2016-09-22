
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const AUTH_SET_ERROR_MESSAGE = 'AUTH_SET_ERROR_MESSAGE';
export const AUTH_CLEAR_ERROR_MESSAGE = 'AUTH_CLEAR_ERROR_MESSAGE';
export const NAVIGATE_TO = 'NAVIGATE_TO';

export interface User {
  username: string,
  godLevel: number,
  email: string,
  token: string
}