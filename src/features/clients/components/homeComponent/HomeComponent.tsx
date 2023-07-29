import React from "react"
import { TaskCard } from "../cards/Task-card"
import { UserTeamCard } from "../cards/UserTeamTask"
import { TasksProgression } from "../cards/TasksProgression"

const HomeComponent = () => {
  const createdTask = "Tâches créees"
  const assignedTask = "Tâches assignées"

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-8">
      <div className="md:col-span-2 md:row-span-1">
        <TaskCard taskTitle={createdTask} taskNumber={0} link="/dashboard/tasks" />
      </div>
      <div className="md:col-span-2 md:row-span-1">
        <TaskCard taskTitle={assignedTask} taskNumber={0} link="/dashboard/assign" />
      </div>
      <div className="md:col-span-2 md:row-span-4">
        <UserTeamCard />
      </div>
      <div className="md:col-span-4">
        <TasksProgression />
      </div>
    </div>
  )
}

export default HomeComponent
