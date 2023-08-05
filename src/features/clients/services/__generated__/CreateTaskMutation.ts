/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateTaskMutation
// ====================================================

export interface CreateTaskMutation_createTask_owner_createdTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
}

export interface CreateTaskMutation_createTask_owner_assignedTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: any | null;
}

export interface CreateTaskMutation_createTask_owner {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
  createdTasks: CreateTaskMutation_createTask_owner_createdTasks[];
  assignedTasks: CreateTaskMutation_createTask_owner_assignedTasks[];
}

export interface CreateTaskMutation_createTask_assignUser_createdTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
}

export interface CreateTaskMutation_createTask_assignUser_assignedTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: any | null;
}

export interface CreateTaskMutation_createTask_assignUser {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
  createdTasks: CreateTaskMutation_createTask_assignUser_createdTasks[];
  assignedTasks: CreateTaskMutation_createTask_assignUser_assignedTasks[];
}

export interface CreateTaskMutation_createTask {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
  owner: CreateTaskMutation_createTask_owner;
  assignUser: CreateTaskMutation_createTask_assignUser;
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
