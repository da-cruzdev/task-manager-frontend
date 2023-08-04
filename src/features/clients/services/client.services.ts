import client from "../../../app/graphql"
import { User } from "../../auth/interfaces/signData.interfaces"
import { CreateTaskData, Task, Tasks, UpdateTaskData } from "../interfaces/tasks.interfaces"
import { CREATE_TASK, DELETE_TASK, GET_ALL_USERS, GET_TASKS, GET_USER_INFO, UPDATE_TASK } from "./queries"

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

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await client.query({ query: GET_ALL_USERS })

      return response.data.users
    } catch (error) {
      throw error
    }
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    try {
      const { title, description, assignedTo, deadline } = data
      const response = await client.mutate({ mutation: CREATE_TASK, variables: { title, description, assignedTo, deadline } })

      return response.data.createTask
    } catch (error) {
      throw error
    }
  }

  async getTasks(): Promise<Tasks[]> {
    try {
      const response = await client.query({ query: GET_TASKS })
      return response.data.tasks
    } catch (error) {
      throw error
    }
  }

  async uppdateTask(id: number, data: UpdateTaskData): Promise<Task> {
    try {
      const response = await client.mutate({ mutation: UPDATE_TASK, variables: { id, ...data } })
      return response.data
    } catch (error) {
      throw error
    }
  }

  async deleteTask(id: number): Promise<Task> {
    try {
      const response = await client.mutate({ mutation: DELETE_TASK, variables: { id } })
      return response.data
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
