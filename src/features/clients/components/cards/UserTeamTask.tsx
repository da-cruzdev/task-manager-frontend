import { Card } from "flowbite-react"
import React from "react"

export const UserTeamCard = () => {
  return (
    <div>
      <Card className="max-w-2xs h-64">
        <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
          <p> Membres de l'équipe </p>
        </h5>
        <p className="font-normal text-5xl font-bold text-gray-700 dark:text-gray-400 mx-auto"> 0</p>
      </Card>
    </div>
  )
}
