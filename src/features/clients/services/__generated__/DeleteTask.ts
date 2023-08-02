/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTask
// ====================================================

export interface DeleteTask_removeTask {
  __typename: "Task";
  id: number;
  title: string;
}

export interface DeleteTask {
  removeTask: DeleteTask_removeTask;
}

export interface DeleteTaskVariables {
  id: number;
}
