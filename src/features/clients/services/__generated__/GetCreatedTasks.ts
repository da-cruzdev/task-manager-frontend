/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TasksFilterOptions, PaginationOptions, TaskStatus } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetCreatedTasks
// ====================================================

export interface GetCreatedTasks_createdTasks_data_assignUser {
  __typename: "User";
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface GetCreatedTasks_createdTasks_data {
  __typename: "Task";
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedToId: number;
  deadline: any | null;
  assignUser: GetCreatedTasks_createdTasks_data_assignUser;
}

export interface GetCreatedTasks_createdTasks {
  __typename: "ResponseWithPagination";
  data: GetCreatedTasks_createdTasks_data[] | null;
  totalCount: number | null;
}

export interface GetCreatedTasks {
  createdTasks: GetCreatedTasks_createdTasks;
}

export interface GetCreatedTasksVariables {
  filterOptions?: TasksFilterOptions | null;
  paginationOptions?: PaginationOptions | null;
}
