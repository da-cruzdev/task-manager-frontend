import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../auth/interfaces/signData.interfaces"
import authServices from "../../auth/services/auth.services"
import toastr from "toastr"
import "toastr/build/toastr.css"

interface UserState {
  data: User | null
  loading: boolean
  error: string | null
  loggedOut: any
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
  loggedOut: null,
}

export const logoutUser = createAsyncThunk<any, number, { rejectValue: string }>("user/logoutUser", async (id: number, { rejectWithValue }) => {
  try {
    await authServices.logout(id)
    toastr.success("Déconnexion réussie")
  } catch (error: any) {
    toastr.error("Erreur lors de la déconnexion")
    return rejectWithValue("Erreur lors de la déconnexion")
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
      .addCase(logoutUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.loggedOut = action.payload
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.loggedOut = action.payload
      })
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
