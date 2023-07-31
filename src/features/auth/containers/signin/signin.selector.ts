import { RootState } from "../../../../app/store"

export const selectTokens = (state: RootState) => state.signin.tokens

export const selectSigninLoading = (state: RootState) => state.signin.loading

export const selectSigninError = (state: RootState) => state.signin.error
