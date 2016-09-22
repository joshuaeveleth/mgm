
export interface User {
  username: string,
  godLevel: number,
  email: string,
  token: string
}

export interface mgmState {
  auth: {
    loggedIn: boolean
    user: User
    errorMsg: string
  }
  url: string
}