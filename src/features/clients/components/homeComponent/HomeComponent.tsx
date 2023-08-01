import React, { useEffect, useState } from "react"
import { TaskCard } from "../cards/Task-card"
import { UserTeamCard } from "../cards/UserTeamTask"
import { TasksProgression } from "../cards/TasksProgression"
import { getAllUsers } from "../../redux/userSlice"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { User } from "../../../auth/interfaces/signData.interfaces"

const HomeComponent = () => {
  const [users, setUsers] = useState<User[]>([])

  const createdTask = "Tâches créees"
  const assignedTask = "Tâches assignées"

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
        <TaskCard taskTitle={createdTask} taskNumber={0} users={users} link="/dashboard/tasks" />
      </div>
      <div className="md:col-span-2 md:row-span-1">
        <TaskCard taskTitle={assignedTask} taskNumber={0} users={users} link="/dashboard/assign" />
      </div>
      <div className="md:col-span-2 md:row-span-2">
        <UserTeamCard />
      </div>
      <div className="md:col-span-4">
        <TasksProgression />
      </div>
    </div>
  )
}

export default HomeComponent
