export interface CreateTaskData {
  title: string
  description: string
  assignedTo: number
  deadline: Date
}

export interface UpdateTaskData {
  title?: string
  description?: string
  assignedTo?: number
  status?: "PENDING" | "IN_PROGRESS" | "DONE"
  deadline?: any
}

export interface Task {
  id: number
  title: string
  description: string
  status: string
  assignedToId: number
  deadline: Date | null
}

export interface TasksFilterOptions {
  query?: string
  status?: string
}

export interface Tasks {
  id: number
  title: string
  description: string
  status: string
  assignedToId?: number
  deadline: Date | null
  owner?: Owner
  assignUser?: AssignUser
}

interface Owner {
  id: number
  email: string
  username: string
  role: string
  createdTasks?: Task[]
  assignedTasks?: Task[]
}

interface AssignUser {
  id: number
  email: string
  username: string
  role: string
  createdTasks?: Task[]
  assignedTasks?: Task[]
}
