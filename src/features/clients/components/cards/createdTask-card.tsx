"use client"

import { Button, Card } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { Tasks } from "../../interfaces/tasks.interfaces"
import { Link } from "react-router-dom"

export const CreatedTaskCard = () => {
  const [createdTasks, setCreatedTasks] = useState<Tasks[]>([])

  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)

  useEffect(() => {
    if (tasks && currentUser) {
      const userCreatedTasks = tasks.filter((task) => task.owner?.id === currentUser.id)
      setCreatedTasks(userCreatedTasks)
    }
  }, [currentUser, tasks])

  return (
    <Card className="max-w-xl h-64">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
        <p> Tâches créees </p>
      </h5>
      <p className="font-normal text-5xl font-bold text-gray-700 dark:text-gray-400 mx-auto"> {createdTasks?.length} </p>
      <Link to="/dashboard/tasks">
        <Button className="mt-9 w-full">
          <p>Voir les tâches créees</p>
        </Button>
      </Link>
    </Card>
  )
}
