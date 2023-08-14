"use client"

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { Link } from "react-router-dom"
import { Tasks } from "../../interfaces/tasks.interfaces"
import { Button, Card, Chip, IconButton, List, ListItem, ListItemPrefix, ListItemSuffix } from "@material-tailwind/react"

type TaskCardProps = {
  link: string
}

function ClipboardDocumentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path
        fillRule="evenodd"
        d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const AssignedTaskCard: React.FC<TaskCardProps> = ({ link }) => {
  const [assignedTasks, setAssignedTasks] = useState<Tasks[]>([])
  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)

  useEffect(() => {
    if (tasks && currentUser) {
      const userAssignedTasks = tasks.filter((task) => task.assignedToId === currentUser.id)

      setAssignedTasks(userAssignedTasks)
    }
  }, [currentUser, tasks])

  return (
    <Card className={assignedTasks.length < 4 ? "w-96 h-full" : "w-96"}>
      <List>
        <ListItem className="text-lg mx-auto">
          Tâches assignées
          <ListItemSuffix>
            <Chip value={assignedTasks?.length} variant="ghost" size="sm" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        {assignedTasks.map((task) => (
          <ListItem ripple={false} key={task.id} className="py-1 pr-1 pl-4">
            <ListItemPrefix>
              <IconButton variant="text" color="blue-gray">
                <ClipboardDocumentIcon />
              </IconButton>
            </ListItemPrefix>
            {task.title}
          </ListItem>
        ))}
        <Link to="/dashboard/assign">
          <Button size="sm" variant="text" className="relative bottom-0 right-0 flex items-center gap-2">
            Voir plus
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Button>
        </Link>
      </List>
    </Card>
  )
}
