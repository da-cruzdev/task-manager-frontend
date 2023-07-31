import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ApolloError } from "@apollo/client"
import authServices from "../../services/auth.services"
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

export const signinUser = createAsyncThunk<SignResponse, SignData, { rejectValue: string }>(
  "signin/signinUser",
  async (data: SignData, { rejectWithValue }) => {
    try {
      const response = await authServices.signin(data)
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

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signinUser.fulfilled, (state, action: PayloadAction<SignResponse>) => {
        state.loading = false
        state.tokens = action.payload
      })
      .addCase(signinUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? null
      })
  },
})

export default signinSlice.reducer
