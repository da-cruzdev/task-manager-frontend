import client from "../../../app/graphql"
import { User } from "../../auth/interfaces/signData.interfaces"
import { GET_USER } from "./queries"
import { setContext } from "@apollo/client/link/context"

class ClientService {
  async getUser(email: string): Promise<User> {
    try {
      const token = this.getToken()
      if (!token) throw new Error("Token manquant")

      const authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: `Bearer${token}`,
          },
        }
      })

      const response = await client.query({
        query: GET_USER,
        variables: { email },
        context: authLink,
      })
      return response.data.user
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
