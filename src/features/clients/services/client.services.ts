import client from "../../../app/graphql"
import { User } from "../../auth/interfaces/signData.interfaces"
import { GET_USER_INFO } from "./queries"

class ClientService {
  async getUserInfo(): Promise<User> {
    try {
      const response = await client.query({
        query: GET_USER_INFO,
      })
      return response.data.getUserInfo
    } catch (error) {
      throw error
    }
  }

  getToken(): string | null {
    return localStorage.getItem("@token")
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ClientService()
