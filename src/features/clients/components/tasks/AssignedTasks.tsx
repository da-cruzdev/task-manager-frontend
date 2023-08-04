import { Button, Table } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Tasks } from "../../interfaces/tasks.interfaces"
import { FiEdit } from "react-icons/fi"

import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import UpdateTasksModal from "../modals/UpdateTasksModal"
import { User } from "../../../auth/interfaces/signData.interfaces"

type TaskCardProps = {
  users: User[]
}

const AssignedTasks: React.FC<TaskCardProps> = ({ users }) => {
  const [assignedTasks, setAssignedTasks] = useState<Tasks[]>([])
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedTaskForUpdate, setSelectedTaskForUpdate] = useState<Tasks | null>(null)

  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)

  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    if (tasks && currentUser) {
      const userAssignedTasks = tasks.filter((task) => task.assignedToId === currentUser.id)

      setAssignedTasks(userAssignedTasks)
    }
  }, [currentUser, tasks])

  return (
    <React.Fragment>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">Tâches assignées</h1>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Titre</Table.HeadCell>
          <Table.HeadCell>Descrption</Table.HeadCell>
          <Table.HeadCell>Statut</Table.HeadCell>
          <Table.HeadCell>Deadline</Table.HeadCell>
          <Table.HeadCell>Owner</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {assignedTasks &&
            assignedTasks.map((task) => (
              <Table.Row key={task.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.title}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.description}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.status}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.deadline?.toLocaleString()}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.owner.username}</Table.Cell>
                <Table.Cell className="flex mx-auto">
                  <Button
                    color="gray"
                    size="xs"
                    className=" me-3"
                    onClick={() => {
                      setUpdateModalOpen(true)
                      setSelectedTaskForUpdate(task)
                    }}
                  >
                    <FiEdit color="blue" className="text-lg" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <UpdateTasksModal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)} users={users} selectedTask={selectedTaskForUpdate} />
    </React.Fragment>
  )
}

export default AssignedTasks
