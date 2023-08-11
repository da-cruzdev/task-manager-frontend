import React, { useEffect, useState } from "react"
import SidebarComponent from "../../components/sidebar/Sidebar"
import { Route, Routes } from "react-router-dom"
import HomeComponent from "../../components/homeComponent/HomeComponent"
import AssignedTasks from "../../components/tasks/AssignedTasks"
import TeamUsers from "../../components/users/TeamUsers"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { getTasks } from "../../redux/taskSlice"
import { getAllUsers } from "../../redux/userSlice"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { PaginationOptions } from "../../interfaces/tasks.interfaces"
import ComplexNavbar from "../../components/navbar/Navbar"
import CreatedTasks from "../../components/tasks/CreatedTasks"
import { UsersFilterOptions } from "../../interfaces/users.interfaces"

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([])

  const [filterOptions, setFilterOptions] = useState<UsersFilterOptions>({
    query: "",
    role: "",
  })
  const [paginationOptions, setPaginationOptions] = useState<PaginationOptions>({
    take: 5,
    skip: 0,
  })
  const [totalCount, setTotalCount] = useState(0)

  const dispatch: AppDispatch = useAppDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTasks = () => {
    dispatch(getTasks({}))
      .unwrap()
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsers = async () => {
    dispatch(getAllUsers({ filterOptions, paginationOptions }))
      .unwrap()
      .then((data) => {
        const users = data.data
        const total = data.totalCount

        setUsers(users)
        setTotalCount(total)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchUsers()

    fetchTasks()
  }, [dispatch, fetchTasks, fetchUsers, filterOptions])

  const totalPages = Math.ceil(totalCount / paginationOptions.take!!)

  const handlePageChange = (newPage: number) => {
    setPaginationOptions((prevOptions) => ({
      ...prevOptions,
      skip: (newPage - 1) * prevOptions.take!!,
    }))
  }

  const handleFilterChange = (filter: UsersFilterOptions) => {
    setFilterOptions(filter)
  }

  return (
    <div className="flex">
      <div className="w-1/5 w-64 h-screen ">
        <SidebarComponent />
      </div>
      <div className="w-4/5 mt-3 px-5 mx-auto">
        <div>
          <ComplexNavbar />
        </div>
        <div className="mt-5">
          <Routes>
            <Route path="" element={<HomeComponent />} />
            <Route path="/tasks" element={<CreatedTasks users={users} />} />
            <Route path="/assign" element={<AssignedTasks users={users} />} />
            <Route
              path="/team-users"
              element={<TeamUsers totalCount={totalPages} onPageChange={handlePageChange} onFilterChange={handleFilterChange} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
