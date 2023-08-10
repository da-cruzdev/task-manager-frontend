"use client"
import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react"
import { ClipboardIcon, ClipboardDocumentListIcon, UserGroupIcon, InboxIcon, HomeIcon } from "@heroicons/react/24/solid"

export default function SidebarComponent() {
  const location = useLocation()
  const [selectedItem, setSelectedItem] = useState("dashboard")

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
  }

  useEffect(() => {
    const pathName = location.pathname
    const lastPath = pathName.substring(pathName.lastIndexOf("/") + 1)
    setSelectedItem(lastPath)
  }, [location.pathname])

  return (
    <Card className="fixed h-full w-64 max-w-[30rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Task Manager
        </Typography>
      </div>
      <List>
        <NavLink to="/dashboard">
          <ListItem selected={selectedItem === "dashboard"} onClick={() => handleItemClick("dashboard")}>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Accueil
          </ListItem>
        </NavLink>
        <NavLink to="/dashboard/tasks">
          <ListItem selected={selectedItem === "tasks"} onClick={() => handleItemClick("tasks")}>
            <ListItemPrefix>
              <ClipboardIcon className="h-5 w-5" />
            </ListItemPrefix>
            Tâches créées
          </ListItem>
        </NavLink>
        <NavLink to="/dashboard/assign">
          <ListItem selected={selectedItem === "assign"} onClick={() => handleItemClick("assign")}>
            <ListItemPrefix>
              <ClipboardDocumentListIcon className="h-5 w-5" />
            </ListItemPrefix>
            Tâches assignées
          </ListItem>
        </NavLink>
        <NavLink to="/dashboard/team-users">
          <ListItem selected={selectedItem === "team-users"} onClick={() => handleItemClick("team-users")}>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Membres de l'équipe
          </ListItem>
        </NavLink>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Notifications
        </ListItem>
      </List>
    </Card>
  )
}
