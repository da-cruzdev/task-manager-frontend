import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CreateTaskData, Task, Tasks } from "../interfaces/tasks.interfaces"
import clientServices from "../services/client.services"
import { ApolloError } from "@apollo/client"
import toastr from "toastr"
import "toastr/build/toastr.css"

interface TaskState {
  loading: boolean
  error: string | null
  task: Task | null
  tasks: Tasks[] | null
}

const initialState: TaskState = {
  loading: false,
  error: null,
  task: null,
  tasks: null,
}

export const createTask = createAsyncThunk<Task, CreateTaskData, { rejectValue: string }>(
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

export const getTasks = createAsyncThunk<Tasks[], void, { rejectValue: string }>("task/getTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await clientServices.getTasks()
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
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
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
