/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TasksFilterOptions, TaskStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetTasks
// ====================================================

export interface GetTasks_tasks_owner_createdTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
}

export interface GetTasks_tasks_owner_assignedTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: any | null;
}

export interface GetTasks_tasks_owner {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
  createdTasks: GetTasks_tasks_owner_createdTasks[];
  assignedTasks: GetTasks_tasks_owner_assignedTasks[];
}

export interface GetTasks_tasks_assignUser_createdTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
}

export interface GetTasks_tasks_assignUser_assignedTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: any | null;
}

export interface GetTasks_tasks_assignUser {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
  createdTasks: GetTasks_tasks_assignUser_createdTasks[];
  assignedTasks: GetTasks_tasks_assignUser_assignedTasks[];
}

export interface GetTasks_tasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
  owner: GetTasks_tasks_owner;
  assignUser: GetTasks_tasks_assignUser;
}

export interface GetTasks {
  tasks: GetTasks_tasks[];
}

export interface GetTasksVariables {
  filterOptions?: TasksFilterOptions | null;
}
