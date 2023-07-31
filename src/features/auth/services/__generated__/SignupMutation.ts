/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignupMutation
// ====================================================

export interface SignupMutation_Signup {
  __typename: "SignResponse";
  accessToken: string;
  refreshToken: string;
}

export interface SignupMutation {
  Signup: SignupMutation_Signup;
}

export interface SignupMutationVariables {
  username: string;
  email: string;
  password: string;
}
