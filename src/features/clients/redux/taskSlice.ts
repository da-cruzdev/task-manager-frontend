import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CreateTaskData, Task } from "../interfaces/tasks.interfaces"
import clientServices from "../services/client.services"
import { ApolloError } from "@apollo/client"
import toastr from "toastr"
import "toastr/build/toastr.css"

interface TaskState {
  loading: boolean
  error: string | null
  task: Task | null
}

const initialState: TaskState = {
  loading: false,
  error: null,
  task: null,
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
  },
})

export default taskSlice.reducer
