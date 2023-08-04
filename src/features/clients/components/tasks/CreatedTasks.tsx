import { Button, Table } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { useSelector } from "react-redux"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { Tasks } from "../../interfaces/tasks.interfaces"
import { DeleteModal } from "../modals/DeleteModal"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { deleteTask } from "../../redux/taskSlice"
import CreateTaskModal from "../modals/CreateTaskModal"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { PlusIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { SpeedDial, SpeedDialHandler, IconButton, SpeedDialContent, SpeedDialAction, Typography } from "@material-tailwind/react"
import UpdateTasksModal from "../modals/UpdateTasksModal"

type TaskCardProps = {
  users: User[]
}

const CreatedTasks: React.FC<TaskCardProps> = ({ users }) => {
  const [createdTasks, setCreatedTasks] = useState<Tasks[]>([])
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedTaskForUpdate, setSelectedTaskForUpdate] = useState<Tasks | null>(null)

  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)

  const [openModal, setOpenModal] = useState(false)

  const dispatch: AppDispatch = useAppDispatch()

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
    if (selectedTask) {
      dispatch(deleteTask(selectedTask.id))
        .unwrap()
        .then(() => {
          setCreatedTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id))
        })
        .catch((err) => {
          console.log(err)
        })
    }
    setOpenModal(false)
  }

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">Tâches créees</h1>
        <DefaultSpeedDial users={users} />
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
                  <Button color="gray" size="xs" onClick={() => handleDelete(task)}>
                    <FiTrash2 color="red" className="text-lg" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <UpdateTasksModal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)} users={users} selectedTask={selectedTaskForUpdate} />
      <DeleteModal isOpen={openModal} onClose={() => setOpenModal(false)} onConfirm={handleDeleteConfirm} />
    </React.Fragment>
  )
}

export const DefaultSpeedDial: React.FC<TaskCardProps> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <SpeedDial placement="right">
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction>
              <ClipboardDocumentIcon color="blue" className="h-5 w-5" onClick={() => setModalOpen(true)} />
              <Typography color="blue" className="text-xs font-normal">
                Créer
              </Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
      <CreateTaskModal open={isModalOpen} onClose={() => setModalOpen(false)} users={users} />
    </div>
  )
}

export default CreatedTasks
