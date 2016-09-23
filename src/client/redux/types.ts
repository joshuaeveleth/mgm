
export const Actions = {
  LOGIN: 'LOGIN_ACTION',
  LOGOUT: 'LOGOUT_ACTION',
  AUTH_SET_ERROR_MESSAGE: 'AUTH_SET_ERROR_MESSAGE',
  AUTH_CLEAR_ERROR_MESSAGE: 'AUTH_CLEAR_ERROR_MESSAGE',
  NAVIGATE_TO: 'NAVIGATE_TO',
  UPSERT_HOST: 'UPSERT_HOST',
  UPSERT_REGION: 'UPSERT_REGION'
}

export interface User {
  username: string,
  godLevel: number,
  email: string,
  token: string
}