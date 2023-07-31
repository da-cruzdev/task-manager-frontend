import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authServices from "../../services/auth.services"
import { ApolloError } from "@apollo/client"
import { SignResponse, SignData } from "../../interfaces/signData.interfaces"
import toastr from "toastr"
import "toastr/build/toastr.css"

interface SignState {
  loading: boolean
  error: string | null
  tokens: SignResponse | null
}
const initialState: SignState = {
  loading: false,
  error: null,
  tokens: null,
}

export const signupUser = createAsyncThunk<SignResponse, SignData, { rejectValue: string }>(
  "signup/signupUser",
  async (data: SignData, { rejectWithValue }) => {
    try {
      const response = await authServices.signup(data)
      if (response.accessToken) {
        const token = response.accessToken
        authServices.setToken(token)
      }

      return response
    } catch (error: any) {
      if (error instanceof ApolloError) {
        toastr.error(error.message)
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
        state.tokens = action.payload
      })
      .addCase(signupUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export default signupSlice.reducer
