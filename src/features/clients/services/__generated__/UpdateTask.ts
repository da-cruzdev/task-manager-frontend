/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TaskStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTask
// ====================================================

export interface UpdateTask_updateTask_owner_createdTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
}

export interface UpdateTask_updateTask_owner_assignedTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: any | null;
}

export interface UpdateTask_updateTask_owner {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
  createdTasks: UpdateTask_updateTask_owner_createdTasks[];
  assignedTasks: UpdateTask_updateTask_owner_assignedTasks[];
}

export interface UpdateTask_updateTask_assignUser_createdTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
}

export interface UpdateTask_updateTask_assignUser_assignedTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: any | null;
}

export interface UpdateTask_updateTask_assignUser {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
  createdTasks: UpdateTask_updateTask_assignUser_createdTasks[];
  assignedTasks: UpdateTask_updateTask_assignUser_assignedTasks[];
}

export interface UpdateTask_updateTask {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
  owner: UpdateTask_updateTask_owner;
  assignUser: UpdateTask_updateTask_assignUser;
}

export interface UpdateTask {
  updateTask: UpdateTask_updateTask;
}

export interface UpdateTaskVariables {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: number;
  deadline: any;
}
