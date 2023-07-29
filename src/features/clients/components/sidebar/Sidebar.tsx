"use client"
import { Sidebar } from "flowbite-react"
import { HiClipboardCopy, HiClipboard, HiHome, HiUserGroup } from "react-icons/hi"
import { NavLink } from "react-router-dom"
import { useState } from "react"

export default function SidebarComponent() {
  const [activeItem, setActiveItem] = useState("dashboard")

  const handleItemActive = (item: string) => {
    setActiveItem(item)
  }

  return (
    <Sidebar aria-label="Default sidebar example" className="h-screen">
      <Sidebar.Logo href="#" img="./logo.svg">
        <p>Task Manager</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <NavLink to="/dashboard" className="flex items-center mb-3" onClick={() => handleItemActive("dashboard")}>
            <Sidebar.Item href="#" icon={HiHome} active={activeItem === "dashboard"}>
              <p className="text-md font-bold">Accueil</p>
            </Sidebar.Item>
          </NavLink>

          <NavLink to="/dashboard/tasks" className="flex items-center mb-5" onClick={() => handleItemActive("tasks")}>
            <Sidebar.Item href="#" icon={HiClipboard} active={activeItem === "tasks"}>
              <p className="text-md font-bold">Tâches créées</p>
            </Sidebar.Item>
          </NavLink>

          <NavLink to="/dashboard/assign" className="flex items-center mb-5" onClick={() => handleItemActive("assign")}>
            <Sidebar.Item href="#" icon={HiClipboardCopy} active={activeItem === "assign"}>
              <p className="text-md font-bold">Tâches assignées</p>
            </Sidebar.Item>
          </NavLink>

          <NavLink to="/dashboard/team-users" className="flex items-center" onClick={() => handleItemActive("team-users")}>
            <Sidebar.Item href="#" icon={HiUserGroup} active={activeItem === "team-users"}>
              <p className="text-md font-bold">Membres de l'équipe</p>
            </Sidebar.Item>
          </NavLink>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
