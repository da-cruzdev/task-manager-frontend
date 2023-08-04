/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTaskMutation
// ====================================================

export interface CreateTaskMutation_createTask {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
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
