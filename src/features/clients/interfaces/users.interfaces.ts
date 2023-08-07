import { User } from "../../auth/interfaces/signData.interfaces"

export interface UpdateUserData {
  username?: string
  email?: string
  oldPassword?: string
  newPassword?: string
}

export interface UpdateUserResponse {
  updatedUser: User
  accessToken: string
  refreshToken: string
}
