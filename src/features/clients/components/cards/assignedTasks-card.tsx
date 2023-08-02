"use client"

import { Button, Card } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { Link } from "react-router-dom"
import { Tasks } from "../../interfaces/tasks.interfaces"

type TaskCardProps = {
  link: string
}
export const AssignedTaskCard: React.FC<TaskCardProps> = ({ link }) => {
  const [assignedTasks, setAssignedTasks] = useState<Tasks[]>([])
  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)

  useEffect(() => {
    if (tasks && currentUser) {
      const userAssignedTasks = tasks.filter((task) => task.assignedToId === currentUser.id)

      setAssignedTasks(userAssignedTasks)
    }
  }, [currentUser, tasks])

  return (
    <Card className="max-w-xl h-64">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
        <p>Tâches assignées</p>
      </h5>
      <p className="font-normal text-5xl font-bold text-gray-700 dark:text-gray-400 mx-auto"> {assignedTasks.length} </p>
      <Link to={link}>
        <Button className="mt-9 mx-auto w-full">
          <p>Voir les tâches assignées</p>
        </Button>
      </Link>
    </Card>
  )
}
