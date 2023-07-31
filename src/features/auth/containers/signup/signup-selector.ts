import { RootState } from "../../../../app/store"

export const selectTokens = (state: RootState) => state.signup.tokens

export const selectSignupLoading = (state: RootState) => state.signup.loading

export const selectSignupError = (state: RootState) => state.signup.error
