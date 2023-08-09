import React, { useEffect, useState } from "react"
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
import { TasksFilterOptions } from "../../interfaces/tasks.interfaces"
import ComplexNavbar from "../../components/navbar/Navbar"

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filterOptions, setFilterOptions] = useState<TasksFilterOptions>({
    query: "",
    status: "",
  })
  const dispatch: AppDispatch = useAppDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTasks = () => {
    dispatch(getTasks({ ...filterOptions }))
      .unwrap()
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  useEffect(() => {
    fetchUsers()

    fetchTasks()
  }, [dispatch, fetchTasks, fetchUsers, filterOptions])

  return (
    <div className="flex">
      <div className="w-1/5 w-64 h-screen ">
        <SidebarComponent />
      </div>
      <div className="w-4/5 mt-4 px-5 mx-auto">
        <div>
          <ComplexNavbar />
        </div>
        <div className="mt-9">
          <Routes>
            <Route path="" element={<HomeComponent />} />
            <Route path="/tasks" element={<CreatedTasks users={users} filterOptions={filterOptions} />} />
            <Route path="/assign" element={<AssignedTasks users={users} filterOptions={filterOptions} />} />
            <Route path="/team-users" element={<TeamUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
