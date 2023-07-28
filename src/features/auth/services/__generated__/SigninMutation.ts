/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SigninMutation
// ====================================================

export interface SigninMutation_Signin_user {
  __typename: "User";
  email: string;
  username: string;
}

export interface SigninMutation_Signin {
  __typename: "SignResponse";
  accessToken: string;
  refreshToken: string;
  user: SigninMutation_Signin_user;
}

export interface SigninMutation {
  Signin: SigninMutation_Signin;
}

export interface SigninMutationVariables {
  email: string;
  password: string;
}
