import client from "../../../app/graphql"
import { LogoutResponse, SignData, SignResponse } from "../interfaces/signData.interfaces"
import { LOGOUT, SIGNIN_MUTATION, SIGNUP_MUTATION } from "./queries"

class AuthService {
  async signup(data: SignData): Promise<SignResponse> {
    try {
      const { username, email, password } = data
      const response = await client.mutate({ mutation: SIGNUP_MUTATION, variables: { username, email, password } })

      return response.data.Signup
    } catch (error) {
      throw error
    }
  }

  async signin(data: SignData): Promise<SignResponse> {
    try {
      const { email, password } = data
      const response = await client.mutate({ mutation: SIGNIN_MUTATION, variables: { email, password } })

      return response.data.Signin
    } catch (error) {
      throw error
    }
  }

  async logout(userId: number): Promise<LogoutResponse> {
    try {
      const idAsNumber = parseInt(userId.toString(), 10)

      const response = await client.mutate({ mutation: LOGOUT, variables: { id: idAsNumber } })
      return response.data.Logout
    } catch (error) {
      throw error
    }
  }

  getToken(): string | null {
    return localStorage.getItem("@token")
  }

  setToken(token: string) {
    localStorage.setItem("@token", token)
  }

  removeToken() {
    localStorage.removeItem("@token")
  }

  isLoggedIn(): boolean {
    const token = this.getToken()

    return !!token
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService()
