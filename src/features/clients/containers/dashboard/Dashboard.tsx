import React from "react"
import Navbar from "../../components/navbar/Navbar"
import SidebarComponent from "../../components/sidebar/Sidebar"
import { Route, Routes } from "react-router-dom"
import HomeComponent from "../../components/homeComponent/HomeComponent"
import CreatedTasks from "../../components/tasks/CreatedTasks"
import AssignedTasks from "../../components/tasks/AssignedTasks"
import TeamUsers from "../../components/users/TeamUsers"

const Dashboard = () => {
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
            <Route path="/tasks" element={<CreatedTasks />} />
            <Route path="/assign" element={<AssignedTasks />} />
            <Route path="/team-users" element={<TeamUsers />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
