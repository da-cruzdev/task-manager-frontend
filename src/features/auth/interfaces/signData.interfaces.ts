export interface SignData {
  username?: string
  email?: string
  password?: string
}

export interface SignResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface User {
  id: string
  email: string
  username: string
}
