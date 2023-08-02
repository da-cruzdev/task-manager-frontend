import { Table } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Tasks } from "../../interfaces/tasks.interfaces"
import { FiEdit, FiTrash2 } from "react-icons/fi"

import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { DeleteModal } from "../modals/DeleteModal"

const AssignedTasks = () => {
  const [assignedTasks, setAssignedTasks] = useState<Tasks[]>([])
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null)

  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (tasks && currentUser) {
      const userAssignedTasks = tasks.filter((task) => task.assignedToId === currentUser.id)

      setAssignedTasks(userAssignedTasks)
    }
  }, [currentUser, tasks])

  const handleDelete = (task: Tasks) => {
    setSelectedTask(task)
    setOpenModal(true)
  }

  const handleDeleteConfirm = () => {
    setOpenModal(false)
  }

  return (
    <React.Fragment>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">Tâches assignées</h1>
      </div>
      <Table hoverable>
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
                  <FiEdit color="blue" className="text-lg" />

                  <FiTrash2 color="red" className="text-lg ms-3" onClick={() => handleDelete(task)} />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <DeleteModal isOpen={openModal} onClose={() => setOpenModal(false)} onConfirm={handleDeleteConfirm} />
    </React.Fragment>
  )
}

export default AssignedTasks
