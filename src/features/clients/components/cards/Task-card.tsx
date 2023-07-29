"use client"

import { Button, Card } from "flowbite-react"

export default function TaskCard() {
  return (
    <Card className="max-w-md h-64">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
        <p>Tâches créees</p>
      </h5>
      <p className="font-normal text-5xl font-bold text-gray-700 dark:text-gray-400 mx-auto">1</p>
      <Button className="mt-9">
        <p>Créer une tâche</p>
      </Button>
    </Card>
  )
}
