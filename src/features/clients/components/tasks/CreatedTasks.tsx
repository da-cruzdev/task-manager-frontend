import React, { useEffect, useState } from "react"
import { selectUser } from "../../redux/clientSelectors"
import { useSelector } from "react-redux"
import { CreateTaskData, PaginationOptions, Tasks, TasksFilterOptions } from "../../interfaces/tasks.interfaces"
import { DeleteModal } from "../modals/DeleteModal"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { createTask, deleteTask, getCreatedTasks, updateTask } from "../../redux/taskSlice"
import CreateTaskModal from "../modals/CreateTaskModal"
import { User } from "../../../auth/interfaces/signData.interfaces"
import UpdateTasksModal from "../modals/UpdateTasksModal"
import { Chip } from "@material-tailwind/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, ArrowRightIcon, ClipboardDocumentListIcon, ClipboardIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
  IconButton,
  Avatar,
} from "@material-tailwind/react"
import { useForm } from "react-hook-form"

const TABLE_HEAD = ["Titre", "Description", "Statut", "Deadline", "Assignée à", "Action"]

type CreateTaskCardProps = {
  users: User[]
}

export const formatDate = (date: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" }
  return new Date(date).toLocaleDateString("fr-FR", options)
}

function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function getStatusChipColor(status: string) {
  return status === "PENDING" ? "yellow" : status === "IN_PROGRESS" ? "blue" : status === "DONE" ? "green" : "gray"
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "PENDING":
      return "En attente"
    case "IN_PROGRESS":
      return "En cours"
    case "DONE":
      return "Terminée"
    default:
      return "Inconnu"
  }
}

export function StatusChip({ status }: { status: string }) {
  return <Chip value={getStatusLabel(status)} color={getStatusChipColor(status)} size="sm" variant="ghost" icon={<Icon />} />
}

export const CreatedTasks: React.FC<CreateTaskCardProps> = ({ users }) => {
  const [createdTasks, setCreatedTasks] = useState<Tasks[]>([])
  const [selectedTask, setSelectedTask] = useState<Tasks | null>(null)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedTaskForUpdate, setSelectedTaskForUpdate] = useState<Tasks | null>(null)
  const [openDeleteModal, setDeleteModal] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [filterOptions, setFilterOptions] = useState<TasksFilterOptions>({
    query: "",
    status: "",
  })
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    take: 5,
    skip: 0,
  })
  const [active, setActive] = React.useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const currentUser = useSelector(selectUser)

  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    const fetchCreatedTasks = () => {
      dispatch(getCreatedTasks({ filterOptions, paginationOptions }))
        .unwrap()
        .then((data) => {
          const tasks = data.data
          console.log(data)

          const total = data.totalCount
          setTotalCount(total)
          setCreatedTasks(tasks)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    fetchCreatedTasks()
  }, [currentUser, dispatch, filterOptions, paginationOptions])

  const handleCreate = (data: CreateTaskData) => {
    dispatch(createTask(data))
      .unwrap()
      .then((newTask: Tasks) => {
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
    setDeleteModal(true)
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
    setDeleteModal(false)
  }

  const { register } = useForm()
  function handleTabClick(event: any, tabValue: string) {
    const newFilterOptions = { ...filterOptions, status: tabValue }
    setFilterOptions(newFilterOptions)
  }
  const totalPages = Math.ceil(totalCount / paginationOptions.take!!)

  const getItemProps = (index: any) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "blue",
      onClick: () => handlePageChange(index),
      className: "rounded-full",
    } as any)

  const handlePageChange = (newPage: number) => {
    setActive(newPage)
    setPaginationOptions((prevOptions) => ({
      ...prevOptions,
      skip: (newPage - 1) * prevOptions.take!!,
    }))
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Liste des tâches créees
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="md" onClick={() => setCreateModalOpen(true)}>
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Créer une tâche
            </Button>
            <CreateTaskModal open={createModalOpen} onClose={() => setCreateModalOpen(false)} users={users} onSubmit={handleCreate} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-10 md:w-max">
            <TabsHeader>
              <Tab key="" value="" className="text-sm" onClick={(e) => handleTabClick(e, "")}>
                Toutes
              </Tab>
              <Tab key="PENDING" value="PENDING" className="text-sm" onClick={(e) => handleTabClick(e, "PENDING")}>
                En&nbsp;attente
              </Tab>
              <Tab key="IN_PROGRESS" value="IN_PROGRESS" className="text-sm" onClick={(e) => handleTabClick(e, "IN_PROGRESS")}>
                En&nbsp;cours
              </Tab>
              <Tab key="DONE" value="DONE" className="text-sm" onClick={(e) => handleTabClick(e, "DONE")}>
                Terminée
              </Tab>
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              {...register("query")}
              label="Recherche"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => {
                const newFilterOptions = { ...filterOptions, query: e.target.value }
                setFilterOptions(newFilterOptions)
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0">
        <table className=" w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {createdTasks.map((task) => (
              <tr key={task.id}>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-row">
                    <ClipboardIcon className="h-6 w-6" color="blue" />
                    <Typography variant="small" color="blue-gray" className="font-normal mt-1 ml-2">
                      {task.title}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-row">
                    <ClipboardDocumentListIcon className="h-6 w-6" color="blue-gray" />

                    <Typography variant="small" color="blue-gray" className="font-normal mt-1 ml-2">
                      {task.description}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-30">
                  <div className="flex flex-row">
                    <StatusChip status={task.status} />
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {formatDate(task.deadline!!)}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <Avatar
                      className=" mx-auto"
                      size="sm"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <Typography variant="small" color="blue-gray" className="font-normal mx-auto">
                      {task.assignUser?.username}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Modifier la tâche">
                    <IconButton
                      variant="text"
                      onClick={() => {
                        setUpdateModalOpen(true)
                        setSelectedTaskForUpdate(task)
                      }}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip content="Supprimer la tâche">
                    <IconButton variant="text" onClick={() => handleDelete(task)}>
                      <TrashIcon className="h-4 w-4" color="red" />
                    </IconButton>
                  </Tooltip>
                  <UpdateTasksModal
                    open={updateModalOpen}
                    onClose={() => setUpdateModalOpen(false)}
                    users={users}
                    selectedTask={selectedTaskForUpdate}
                    onSubmit={handleUpdate}
                  />
                  <DeleteModal isOpen={openDeleteModal} onClose={() => setDeleteModal(false)} onConfirm={handleDeleteConfirm} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className="flex items-center gap-4 mx-auto">
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={() => handlePageChange(active - 1)}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <IconButton {...getItemProps(index + 1)} key={index} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </IconButton>
            ))}
          </div>
          <Button
            variant="text"
            className="flex items-center gap-2 rounded-full"
            onClick={() => handlePageChange(active + 1)}
            disabled={active === totalPages}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CreatedTasks
