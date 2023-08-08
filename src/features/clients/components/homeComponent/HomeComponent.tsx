import React from "react"
import { CreatedTaskCard } from "../cards/createdTask-card"
import { UserTeamCard } from "../cards/UserTeamCard"
import { AssignedTaskCard } from "../cards/assignedTasks-card"
import { useSelector } from "react-redux"
import { selectUsers } from "../../redux/clientSelectors"
import TasksProgression from "../cards/TasksProgression"

const HomeComponent = () => {
  const users = useSelector(selectUsers)

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-8">
      <div className="md:col-span-2 md:row-span-1">
        <CreatedTaskCard />
      </div>
      <div className="md:col-span-2 md:row-span-1">
        <AssignedTaskCard link="/dashboard/assign" />
      </div>
      <div className="md:col-span-2 md:row-span-2">
        <UserTeamCard users={users} />
      </div>
      <div className="md:col-span-4">
        <TasksProgression />
      </div>
    </div>
  )
}

export default HomeComponent
