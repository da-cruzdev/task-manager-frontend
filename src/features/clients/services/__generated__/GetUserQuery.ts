/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserQuery
// ====================================================

export interface GetUserQuery_user {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface GetUserQuery {
  user: GetUserQuery_user;
}

export interface GetUserQueryVariables {
  email: string;
}
