/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Statut de la tâche
 */
export enum TaskStatus {
  DONE = "DONE",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

export interface PaginationOptions {
  skip?: number | null;
  take?: number | null;
}

export interface TasksFilterOptions {
  query?: string | null;
  status?: string | null;
}

export interface UsersFilterOptions {
  query?: string | null;
  role?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
