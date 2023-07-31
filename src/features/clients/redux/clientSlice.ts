import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../../auth/interfaces/signData.interfaces"
import clientServices from "../services/client.services"
import toastr from "toastr"
import "toastr/build/toastr.css"

interface ClientState {
  loading: boolean
  error: string | null
  user: User | null
}

const initialState: ClientState = {
  loading: false,
  error: null,
  user: null,
}

export const getUser = createAsyncThunk<User>("client/getUser", async (_, { rejectWithValue }) => {
  try {
    const response = await clientServices.getUserInfo()
    return response
  } catch (error: any) {
    toastr.error(error.message)
    return rejectWithValue(error.message) || "Erreur lors de la récupération du l'utlisateur"
  }
})

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export default clientSlice.reducer
