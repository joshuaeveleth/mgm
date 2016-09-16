
export interface action {
  type: string
}

/** Types */
export const LOGIN_ACTION = 'LOGIN_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export function loginAction(){
  return { type: LOGIN_ACTION };
}

export function logoutFunction(){
  return { type: LOGOUT_ACTION };
}