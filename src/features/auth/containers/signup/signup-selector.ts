import { RootState } from "../../../../app/store"

export const selectSignupData = (state: RootState) => state.signup.data

export const selectSignupLoading = (state: RootState) => state.signup.loading

export const selectSignupError = (state: RootState) => state.signup.error
