/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TasksFilterOptions, TaskStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetAssignedTasks
// ====================================================

export interface GetAssignedTasks_assignedTasks_owner {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface GetAssignedTasks_assignedTasks {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
  owner: GetAssignedTasks_assignedTasks_owner;
}

export interface GetAssignedTasks {
  assignedTasks: GetAssignedTasks_assignedTasks[];
}

export interface GetAssignedTasksVariables {
  filterOptions?: TasksFilterOptions | null;
}
