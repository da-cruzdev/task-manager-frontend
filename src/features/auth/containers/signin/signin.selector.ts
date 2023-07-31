import { RootState } from "../../../../app/store"

export const selectSigninData = (state: RootState) => state.signin.data

export const selectSigninLoading = (state: RootState) => state.signin.loading

export const selectSigninError = (state: RootState) => state.signin.error
