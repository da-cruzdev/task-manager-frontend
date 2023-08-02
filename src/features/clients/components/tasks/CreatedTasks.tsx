import { Table } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { useSelector } from "react-redux"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { Tasks } from "../../interfaces/tasks.interfaces"
import { DeleteModal } from "../modals/DeleteModal"

const CreatedTasks = () => {
  const [createdTasks, setCreatedTasks] = useState<Tasks[]>([])
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null)

  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)

  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (tasks && currentUser) {
      const userCreatedTasks = tasks.filter((task) => task.owner.id === currentUser.id)
      setCreatedTasks(userCreatedTasks)
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
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">Tâches créees</h1>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Titre</Table.HeadCell>
          <Table.HeadCell>Descrption</Table.HeadCell>
          <Table.HeadCell>Statut</Table.HeadCell>
          <Table.HeadCell>Deadline</Table.HeadCell>
          <Table.HeadCell>Assigné à</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {createdTasks &&
            createdTasks.map((task) => (
              <Table.Row key={task.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.title}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.description}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.status}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.deadline?.toLocaleString()}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{task.assignUser.username}</Table.Cell>
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

export default CreatedTasks
