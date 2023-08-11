import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  CreateTaskData,
  PaginationOptions,
  ResponseWithPagination,
  Task,
  Tasks,
  TasksFilterOptions,
  UpdateTaskData,
} from "../interfaces/tasks.interfaces"
import clientServices from "../services/client.services"
import { ApolloError } from "@apollo/client"
import toastr from "toastr"
import "toastr/build/toastr.css"

interface TaskState {
  loading: boolean
  error: string | null
  task: Tasks | null
  tasks: Tasks[] | null
  createdTasks: ResponseWithPagination | null
  assignedTasks: ResponseWithPagination | null
  updatedTask: Tasks | null
}

const initialState: TaskState = {
  loading: false,
  error: null,
  task: null,
  tasks: null,
  updatedTask: null,
  createdTasks: null,
  assignedTasks: null,
}

export const createTask = createAsyncThunk<Tasks, CreateTaskData, { rejectValue: string }>(
  "task/createTask",
  async (data: CreateTaskData, { rejectWithValue }) => {
    try {
      const response = await clientServices.createTask(data)
      toastr.success("Tâche créee avec success..!!!")
      return response
    } catch (error: any) {
      if (error instanceof ApolloError) {
        toastr.error(error.message)
      }
      return rejectWithValue(error.message || "Erreur lors de la création de la tâche")
    }
  },
)

export const updateTask = createAsyncThunk<Tasks, { id: number; data: UpdateTaskData }, { rejectValue: string }>(
  "task/updateTask",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await clientServices.uppdateTask(id, data)
      toastr.success("Tâche modifiée avec success..!!!")
      return response
    } catch (error: any) {
      if (error instanceof ApolloError) {
        toastr.error(error.message)
      }
      return rejectWithValue(error.message || "Erreur lors de la modification de la tâche")
    }
  },
)

export const getTasks = createAsyncThunk<Tasks[], TasksFilterOptions, { rejectValue: string }>(
  "task/getTasks",
  async (filterOptions, { rejectWithValue }) => {
    try {
      const response = await clientServices.getTasks(filterOptions)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message || "Erreur lors de la récupération des tâches")
    }
  },
)

export const getCreatedTasks = createAsyncThunk<
  ResponseWithPagination,
  { filterOptions?: TasksFilterOptions; paginationOptions?: PaginationOptions },
  { rejectValue: string }
>("task/getCreatedTasks", async ({ filterOptions, paginationOptions }, { rejectWithValue }) => {
  try {
    const response = await clientServices.getCreatedTasks(filterOptions, paginationOptions)
    return response
  } catch (error: any) {
    return rejectWithValue(error.message || "Erreur lors de la récupération des tâches")
  }
})

export const getAssignedTasks = createAsyncThunk<
  ResponseWithPagination,
  { filterOptions?: TasksFilterOptions; paginationOptions?: PaginationOptions },
  { rejectValue: string }
>("task/getAssignedTasks", async ({ filterOptions, paginationOptions }, { rejectWithValue }) => {
  try {
    const response = await clientServices.getAssignedTasks(filterOptions, paginationOptions)
    return response
  } catch (error: any) {
    return rejectWithValue(error.message || "Erreur lors de la récupération des tâches")
  }
})

export const deleteTask = createAsyncThunk<Task, number, { rejectValue: string }>("task/deleteTask", async (id: number, { rejectWithValue }) => {
  try {
    const response = await clientServices.deleteTask(id)
    toastr.success("Tâche supprimée avec success..!!!")
    return response
  } catch (error: any) {
    if (error instanceof ApolloError) {
      toastr.error(error.message)
    }
    return rejectWithValue(error.message || "Erreur lors de la suppression de la tâche")
  }
})

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Tasks>) => {
        state.loading = false
        state.error = null
        state.task = action.payload
      })
      .addCase(createTask.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<Tasks[]>) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
      .addCase(getCreatedTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCreatedTasks.fulfilled, (state, action: PayloadAction<ResponseWithPagination>) => {
        state.loading = false
        state.createdTasks = action.payload
      })
      .addCase(getCreatedTasks.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
      .addCase(getAssignedTasks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAssignedTasks.fulfilled, (state, action: PayloadAction<ResponseWithPagination>) => {
        state.loading = false
        state.assignedTasks = action.payload
      })
      .addCase(getAssignedTasks.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Tasks>) => {
        state.loading = false
        state.updatedTask = action.payload
      })
      .addCase(updateTask.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(deleteTask.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export default taskSlice.reducer
