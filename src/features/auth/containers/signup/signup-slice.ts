import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authServices from "../../services/auth.services"
import { ApolloError } from "@apollo/client"
import { SignResponse, SignData } from "../../interfaces/signData.interfaces"

interface SignState {
  loading: boolean
  error: string | null
  data: SignResponse | null
}
const initialState: SignState = {
  loading: false,
  error: null,
  data: null,
}

export const signupUser = createAsyncThunk<SignResponse, SignData, { rejectValue: string }>(
  "signup/signupUser",
  async (data: SignData, { rejectWithValue }) => {
    try {
      const response = await authServices.signup(data)
      if (response.refreshToken) {
        authServices.setToken(response.accessToken)
      }

      return response
    } catch (error: any) {
      if (error instanceof ApolloError) {
      }
      return rejectWithValue(error.message || "error lors de l'inscription")
    }
  },
)

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<SignResponse>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(signupUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export default signupSlice.reducer
