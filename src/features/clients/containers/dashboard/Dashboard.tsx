import React, { useEffect, useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import SidebarComponent from "../../components/sidebar/Sidebar"
import { Route, Routes } from "react-router-dom"
import HomeComponent from "../../components/homeComponent/HomeComponent"
import CreatedTasks from "../../components/tasks/CreatedTasks"
import AssignedTasks from "../../components/tasks/AssignedTasks"
import TeamUsers from "../../components/users/TeamUsers"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { getTasks } from "../../redux/taskSlice"
import { getAllUsers } from "../../redux/userSlice"
import { User } from "../../../auth/interfaces/signData.interfaces"

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    const fetchTasks = () => {
      dispatch(getTasks())
        .unwrap()
        .then(() => {})
        .catch((err) => {
          console.log(err)
        })
    }
    const fetchUsers = async () => {
      dispatch(getAllUsers())
        .unwrap()
        .then((data) => {
          setUsers(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchUsers()

    fetchTasks()
  }, [dispatch])

  return (
    <div className="flex">
      <div className="w-1/5 w-64 h-screen ">
        <SidebarComponent />
      </div>
      <div className="w-4/5 mt-4 px-5 mx-auto">
        <div>
          <Navbar />
        </div>
        <div className="mt-9">
          <Routes>
            <Route path="" element={<HomeComponent />} />
            <Route path="/tasks" element={<CreatedTasks users={users} />} />
            <Route path="/assign" element={<AssignedTasks users={users} />} />
            <Route path="/team-users" element={<TeamUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
