import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import signupReducer from "../features/auth/containers/signup/signup-slice"
import signinReducer from "../features/auth/containers/signin/signin-slice"
import clientReducer from "../features/clients/redux/clientSlice"
import userReducer from "../features/clients/redux/userSlice"
import { useDispatch } from "react-redux"

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  client: clientReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()
