import React, { useEffect, useState } from "react"
import { CreatedTaskCard } from "../cards/createdTask-card"
import { UserTeamCard } from "../cards/UserTeamTask"
import { TasksProgression } from "../cards/TasksProgression"
import { getAllUsers } from "../../redux/userSlice"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { AssignedTaskCard } from "../cards/assignedTasks-card"

const HomeComponent = () => {
  const [users, setUsers] = useState<User[]>([])

  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllUsers())
        .unwrap()
        .then((data) => {
          setUsers(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData()
  }, [dispatch])

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-8">
      <div className="md:col-span-2 md:row-span-1">
        <CreatedTaskCard users={users} />
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
