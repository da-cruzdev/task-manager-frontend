/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserInfo
// ====================================================

export interface GetUserInfo_getUserInfo {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface GetUserInfo {
  getUserInfo: GetUserInfo_getUserInfo;
}
