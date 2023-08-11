/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TasksFilterOptions, PaginationOptions, TaskStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetAssignedTasks
// ====================================================

export interface GetAssignedTasks_assignedTasks_data_owner {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface GetAssignedTasks_assignedTasks_data {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
  owner: GetAssignedTasks_assignedTasks_data_owner;
}

export interface GetAssignedTasks_assignedTasks {
  __typename: "ResponseWithPagination";
  data: GetAssignedTasks_assignedTasks_data[] | null;
  totalCount: number | null;
}

export interface GetAssignedTasks {
  assignedTasks: GetAssignedTasks_assignedTasks;
}

export interface GetAssignedTasksVariables {
  filterOptions?: TasksFilterOptions | null;
  paginationOptions?: PaginationOptions | null;
}
