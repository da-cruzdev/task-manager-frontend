import { Badge, Button, Table } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Tasks, TasksFilterOptions } from "../../interfaces/tasks.interfaces"
import { FiEdit } from "react-icons/fi"
import { HiClipboard, HiUser } from "react-icons/hi"

import { selectUser } from "../../redux/clientSelectors"
import UpdateTasksModal from "../modals/UpdateTasksModal"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { getAssignedTasks, updateTask } from "../../redux/taskSlice"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { formatDateWithIcon, formatStatusWithIcon } from "./CreatedTasks"

type TaskCardProps = {
  users: User[]
  filterOptions: TasksFilterOptions
}

const AssignedTasks: React.FC<TaskCardProps> = ({ users, filterOptions }) => {
  const [assignedTasks, setAssignedTasks] = useState<Tasks[]>([])
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedTaskForUpdate, setSelectedTaskForUpdate] = useState<Tasks | null>(null)

  // const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    const fetchAssignedTasks = () => {
      dispatch(getAssignedTasks({ ...filterOptions }))
        .unwrap()
        .then((tasks) => {
          setAssignedTasks(tasks)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchAssignedTasks()
  }, [currentUser, dispatch, filterOptions])

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
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiClipboard} size="sm" color="white" />
                    {task.description}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{formatStatusWithIcon(task.status)}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{formatDateWithIcon(task.deadline!!)}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiUser} className="mr-1" color="white" /> {task.owner?.username}
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
    </React.Fragment>
  )
}

export default AssignedTasks
