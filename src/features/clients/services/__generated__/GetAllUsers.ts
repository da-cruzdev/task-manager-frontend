/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllUsers
// ====================================================

export interface GetAllUsers_users {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface GetAllUsers {
  users: GetAllUsers_users[];
}
