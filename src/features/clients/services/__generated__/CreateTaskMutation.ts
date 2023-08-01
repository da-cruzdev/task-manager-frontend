/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTaskMutation
// ====================================================

export interface CreateTaskMutation_createTask {
  __typename: "Task";
  id: string;
  title: string;
  description: string;
  status: string;
  assignedToId: number;
  deadline: any | null;
}

export interface CreateTaskMutation {
  createTask: CreateTaskMutation_createTask;
}

export interface CreateTaskMutationVariables {
  title: string;
  description: string;
  assignedTo: number;
  deadline: any;
}
