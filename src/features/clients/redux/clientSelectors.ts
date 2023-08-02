import { RootState } from "../../../app/store"

export const selectUser = (state: RootState) => state.client.user

export const selectTasks = (state: RootState) => state.task.tasks

export const selectUsers = (state: RootState) => state.user.users

export const selectTask = (state: RootState) => state.task.task
