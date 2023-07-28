import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import signupReducer from "../features/auth/containers/signup/signup-slice"
import signinReducer from "../features/auth/containers/signin/signin-slice"

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
