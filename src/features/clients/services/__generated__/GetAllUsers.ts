/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsersFilterOptions, PaginationOptions } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetAllUsers
// ====================================================

export interface GetAllUsers_users_data {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface GetAllUsers_users {
  __typename: "UserResponseData";
  data: GetAllUsers_users_data[] | null;
  totalCount: number | null;
}

export interface GetAllUsers {
  users: GetAllUsers_users;
}

export interface GetAllUsersVariables {
  filterOptions?: UsersFilterOptions | null;
  paginationOptions?: PaginationOptions | null;
}
