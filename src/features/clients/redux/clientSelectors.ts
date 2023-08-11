import { RootState } from "../../../app/store"

export const selectUser = (state: RootState) => state.client.user

export const selectTasks = (state: RootState) => state.task.tasks

export const selectUsers = (state: RootState) => state.user.users?.data

export const selectTask = (state: RootState) => state.task.task

export const selectCreatedTasks = (state: RootState) => state.task.createdTasks?.data

export const selectAssignedTasks = (state: RootState) => state.task.assignedTasks?.data
