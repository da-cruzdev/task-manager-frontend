"use client"

import { Button, Card } from "flowbite-react"
import React from "react"

type TaskCardProps = {
  taskTitle: string
  taskNumber: number
  link: string
}
export const TaskCard: React.FC<TaskCardProps> = ({ taskTitle, taskNumber }) => {
  return (
    <Card className="max-w-xl h-64">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
        <p> {taskTitle} </p>
      </h5>
      <p className="font-normal text-5xl font-bold text-gray-700 dark:text-gray-400 mx-auto"> {taskNumber} </p>
      <Button className="mt-9">
        <p>Créer une tâche</p>
      </Button>
    </Card>
  )
}
