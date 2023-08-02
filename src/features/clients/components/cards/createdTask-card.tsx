"use client"

import { Button, Card } from "flowbite-react"
import React, { useEffect, useState } from "react"
import CreateTaskModal from "../modals/CreateTaskModal"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { useSelector } from "react-redux"
import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { Tasks } from "../../interfaces/tasks.interfaces"

type TaskCardProps = {
  users: User[]
}

export const CreatedTaskCard: React.FC<TaskCardProps> = ({ users }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [createdTasks, setCreatedTasks] = useState<Tasks[]>([])

  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)

  useEffect(() => {
    if (tasks && currentUser) {
      const userCreatedTasks = tasks.filter((task) => task.owner.id === currentUser.id)
      setCreatedTasks(userCreatedTasks)
    }
  }, [currentUser, tasks])

  return (
    <Card className="max-w-xl h-64">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
        <p> Tâches créees </p>
      </h5>
      <p className="font-normal text-5xl font-bold text-gray-700 dark:text-gray-400 mx-auto"> {createdTasks?.length} </p>
      <Button className="mt-9" onClick={() => setModalOpen(true)}>
        <p>Créer une tâche</p>
      </Button>
      <CreateTaskModal open={isModalOpen} onClose={() => setModalOpen(false)} users={users} />
    </Card>
  )
}
