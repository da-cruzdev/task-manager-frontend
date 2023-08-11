import { MagnifyingGlassIcon, ClipboardIcon, ClipboardDocumentListIcon, PencilIcon } from "@heroicons/react/24/solid"
import {
  CardHeader,
  Typography,
  TabsHeader,
  Tab,
  Input,
  CardBody,
  IconButton,
  CardFooter,
  Card,
  Tabs,
  Tooltip,
  Avatar,
} from "@material-tailwind/react"
import React, { useEffect, useState } from "react"
import UpdateTasksModal from "../modals/UpdateTasksModal"
import { useSelector } from "react-redux"
import { PaginationOptions, Tasks, TasksFilterOptions } from "../../interfaces/tasks.interfaces"

import { selectUser } from "../../redux/clientSelectors"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { getAssignedTasks, updateTask } from "../../redux/taskSlice"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { useForm } from "react-hook-form"
import { StatusChip, formatDate } from "../../../shared/utils/fonctions"
import Pagination from "../pagination/Pagination"

type TaskCardProps = {
  users: User[]
}

const TABLE_HEAD = ["Titre", "Description", "Statut", "Deadline", "Owner", "Action"]

const AssignedTasks: React.FC<TaskCardProps> = ({ users }) => {
  const [assignedTasks, setAssignedTasks] = useState<Tasks[]>([])
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedTaskForUpdate, setSelectedTaskForUpdate] = useState<Tasks | null>(null)
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
    const fetchAssignedTasks = () => {
      dispatch(getAssignedTasks({ filterOptions, paginationOptions }))
        .unwrap()
        .then((data) => {
          const tasks = data.data
          const total = data.totalCount

          setTotalCount(total)
          setAssignedTasks(tasks)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchAssignedTasks()
  }, [currentUser, dispatch, filterOptions, paginationOptions])

  const handleUpdate = (data: any) => {
    dispatch(updateTask(data))
      .unwrap()
      .then((newTask: Tasks) => {
        setAssignedTasks((oldTasks) => {
          const filteredTasks = oldTasks.filter((task) => task.id !== newTask.id)
          return [newTask, ...filteredTasks]
        })
        setUpdateModalOpen(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const { register } = useForm()
  function handleTabClick(event: any, tabValue: string) {
    const newFilterOptions = { ...filterOptions, status: tabValue }
    setFilterOptions(newFilterOptions)
  }

  const totalPages = Math.ceil(totalCount / paginationOptions.take!!)

  const handlePageChange = (newPage: number) => {
    setActive(newPage)
    setPaginationOptions((prevOptions) => ({
      ...prevOptions,
      skip: (newPage - 1) * prevOptions.take!!,
    }))
  }

  return (
    <React.Fragment>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Liste des tâches assignées
              </Typography>
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
              {assignedTasks.map((task) => (
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
                        {task.owner?.username}
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

                    <UpdateTasksModal
                      open={updateModalOpen}
                      onClose={() => setUpdateModalOpen(false)}
                      users={users}
                      selectedTask={selectedTaskForUpdate}
                      onSubmit={handleUpdate}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Pagination totalPages={totalPages} activePage={active} onPageChange={handlePageChange} />
        </CardFooter>
      </Card>
    </React.Fragment>
  )
}

export default AssignedTasks
