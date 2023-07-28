/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignupMutation
// ====================================================

export interface SignupMutation_Signup_user {
  __typename: "User";
  id: string;
  email: string;
  username: string;
}

export interface SignupMutation_Signup {
  __typename: "SignResponse";
  accessToken: string;
  refreshToken: string;
  user: SignupMutation_Signup_user;
}

export interface SignupMutation {
  Signup: SignupMutation_Signup;
}

export interface SignupMutationVariables {
  username: string;
  email: string;
  password: string;
}
