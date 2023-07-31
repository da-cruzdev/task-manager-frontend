/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: logout
// ====================================================

export interface logout_Logout {
  __typename: "LogoutResponse";
  loggedOut: boolean;
}

export interface logout {
  Logout: logout_Logout;
}

export interface logoutVariables {
  id: number;
}
