export interface CreateTaskData {
  title: string
  description: string
  assignedTo: number
  deadline: Date
}

export interface Task {
  id: number
  title: string
  description: string
  status: string
  assignedToId: number
  deadline: Date | null
}
