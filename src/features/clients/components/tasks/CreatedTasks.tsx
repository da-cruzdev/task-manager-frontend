import { Badge, Button, Table } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { useSelector } from "react-redux"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { CreateTaskData, Tasks } from "../../interfaces/tasks.interfaces"
import { DeleteModal } from "../modals/DeleteModal"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { createTask, deleteTask, updateTask } from "../../redux/taskSlice"
import CreateTaskModal from "../modals/CreateTaskModal"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { PlusIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { SpeedDial, SpeedDialHandler, IconButton, SpeedDialContent, SpeedDialAction, Typography } from "@material-tailwind/react"
import UpdateTasksModal from "../modals/UpdateTasksModal"
import { HiBadgeCheck, HiClock, HiUser, HiClipboard } from "react-icons/hi"

type TaskCardProps = {
  users: User[]
  handleSubmit: (data: CreateTaskData) => void
}

type CreateTaskCardProps = {
  users: User[]
}

export const formatStatusWithIcon = (status: string): React.ReactNode => {
  const statusMappings: { [key: string]: { label: string; icon: React.ReactNode } } = {
    PENDING: { label: "En attente", icon: <Badge icon={HiClock} className=" mr-2" color="red" size="sm" /> },
    IN_PROGRESS: { label: "En cours", icon: <Badge icon={HiClock} className=" mr-2" size="sm" /> },
    DONE: { label: "Terminée", icon: <Badge icon={HiBadgeCheck} className=" mr-2" size="sm" /> },
  }

  const statusMapping = statusMappings[status]

  if (statusMapping) {
    return (
      <span className="flex items-center">
        {statusMapping.icon}
        {statusMapping.label}
      </span>
    )
  }

  return status
}

const formatDate = (date: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" }
  return new Date(date).toLocaleDateString("fr-FR", options)
}

export const formatDateWithIcon = (date: Date): React.ReactNode => {
  const formattedDate = formatDate(date)

  return (
    <span className="flex items-center">
      <Badge icon={HiClock} className=" mr-1" color="gray" />
      {formattedDate}
    </span>
  )
}

const CreatedTasks: React.FC<CreateTaskCardProps> = ({ users }) => {
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
      setCreatedTasks(userCreatedTasks.reverse())
    }
  }, [currentUser, tasks])

  const handleCreate = (data: CreateTaskData) => {
    dispatch(createTask(data))
      .unwrap()
      .then((newTask: Tasks) => {
        console.log(data)
        setCreatedTasks((oldTasks) => {
          const filteredTasks = oldTasks.filter((task) => task.id !== newTask.id)
          return [newTask, ...filteredTasks]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleUpdate = (data: any) => {
    dispatch(updateTask(data))
      .unwrap()
      .then((updatedTask: Tasks) => {
        setCreatedTasks((oldTasks) => {
          const filteredTasks = oldTasks.filter((task) => task.id !== updatedTask.id)
          return [updatedTask, ...filteredTasks]
        })

        setUpdateModalOpen(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
        <DefaultSpeedDial users={users} handleSubmit={handleCreate} />
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
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiClipboard} size="sm" color="gray" />
                    {task.description}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{formatStatusWithIcon(task.status)}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{formatDateWithIcon(task.deadline!!)}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiUser} className="mr-1" color="gray" /> {task.assignUser.username}
                  </div>
                </Table.Cell>
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
      <UpdateTasksModal
        open={updateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        users={users}
        selectedTask={selectedTaskForUpdate}
        onSubmit={handleUpdate}
      />
      <DeleteModal isOpen={openModal} onClose={() => setOpenModal(false)} onConfirm={handleDeleteConfirm} />
    </React.Fragment>
  )
}

export const DefaultSpeedDial: React.FC<TaskCardProps> = ({ users, handleSubmit }) => {
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

      <CreateTaskModal open={isModalOpen} onClose={() => setModalOpen(false)} users={users} onSubmit={handleSubmit} />
    </div>
  )
}

export default CreatedTasks
