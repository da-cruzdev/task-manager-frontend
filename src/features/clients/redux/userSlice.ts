import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LogoutResponse, User } from "../../auth/interfaces/signData.interfaces"
import authServices from "../../auth/services/auth.services"
import toastr from "toastr"
import "toastr/build/toastr.css"
import clientServices from "../services/client.services"

interface UserState {
  data: User | null
  loading: boolean
  error: string | null
  loggedOut: LogoutResponse | null
  users: User[] | null
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
  loggedOut: null,
  users: null,
}

export const getAllUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "user/users",

  async (_, { rejectWithValue }) => {
    try {
      const response = await clientServices.getAllUsers()

      return response
    } catch (error: any) {
      toastr.error(error)
      return rejectWithValue(error.message || "Erreur lors de la récupération des utilisateurs")
    }
  },
)

export const logoutUser = createAsyncThunk<any, number, { rejectValue: string }>("user/logoutUser", async (id: number, { rejectWithValue }) => {
  try {
    const response = await authServices.logout(id)
    if (response.loggedOut === true) {
      authServices.removeToken()
    }
    toastr.success("Déconnexion réussie")
    return response
  } catch (error: any) {
    toastr.error(error)
    return rejectWithValue(error.message) || "Erreur lors de la déconnexion"
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state, action: PayloadAction<LogoutResponse>) => {
        state.loading = false
        state.loggedOut = action.payload
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.loggedOut = action.payload
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action: PayloadAction<string | any>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
