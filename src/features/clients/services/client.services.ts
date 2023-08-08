import client from "../../../app/graphql"
import { User } from "../../auth/interfaces/signData.interfaces"
import { CreateTaskData, PaginationOptions, Task, Tasks, TasksFilterOptions, UpdateTaskData } from "../interfaces/tasks.interfaces"
import { UpdateUserData, UpdateUserResponse } from "../interfaces/users.interfaces"
import {
  CREATE_TASK,
  DELETE_TASK,
  GET_ALL_USERS,
  GET_ASSIGNED_TASKS,
  GET_CREATED_TASKS,
  GET_TASKS,
  GET_USER_INFO,
  UPDATE_TASK,
  UPDATE_USER_INFO,
} from "./queries"

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

  async updateUser(data: UpdateUserData): Promise<UpdateUserResponse> {
    try {
      const { username, email, oldPassword, newPassword } = data
      const response = await client.mutate({ mutation: UPDATE_USER_INFO, variables: { username, email, oldPassword, newPassword } })

      return response.data.updateUser
    } catch (error) {
      throw error
    }
  }

  async createTask(data: CreateTaskData): Promise<Tasks> {
    try {
      const { title, description, assignedTo, deadline } = data
      const response = await client.mutate({ mutation: CREATE_TASK, variables: { title, description, assignedTo, deadline } })

      return response.data.createTask
    } catch (error) {
      throw error
    }
  }

  async getTasks(filterOptions?: TasksFilterOptions): Promise<Tasks[]> {
    try {
      const response = await client.query({ query: GET_TASKS, variables: { filterOptions } })
      return response.data.tasks
    } catch (error) {
      throw error
    }
  }

  async getCreatedTasks(filterOptions?: TasksFilterOptions, paginationOptions?: PaginationOptions): Promise<Tasks[]> {
    try {
      const response = await client.query({ query: GET_CREATED_TASKS, variables: { filterOptions, paginationOptions } })
      return response.data.createdTasks
    } catch (error) {
      throw error
    }
  }

  async getAssignedTasks(filterOptions?: TasksFilterOptions): Promise<Tasks[]> {
    try {
      const response = await client.query({ query: GET_ASSIGNED_TASKS, variables: { filterOptions } })
      return response.data.assignedTasks
    } catch (error) {
      throw error
    }
  }

  async uppdateTask(id: number, data: UpdateTaskData): Promise<Tasks> {
    try {
      const response = await client.mutate({ mutation: UPDATE_TASK, variables: { id, ...data } })
      return response.data.updateTask
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
