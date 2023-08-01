import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import signupReducer from "../features/auth/containers/signup/signup-slice"
import signinReducer from "../features/auth/containers/signin/signin-slice"
import clientReducer from "../features/clients/redux/clientSlice"
import userReducer from "../features/clients/redux/userSlice"
import taskReducer from "../features/clients/redux/taskSlice"
import { useDispatch } from "react-redux"

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    client: clientReducer,
    user: userReducer,
    task: taskReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()
