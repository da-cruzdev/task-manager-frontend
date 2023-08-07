/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserInfo
// ====================================================

export interface UpdateUserInfo_updateUser_updatedUser {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface UpdateUserInfo_updateUser {
  __typename: "UpdateUserResponse";
  updatedUser: UpdateUserInfo_updateUser_updatedUser;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateUserInfo {
  updateUser: UpdateUserInfo_updateUser;
}

export interface UpdateUserInfoVariables {
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}
