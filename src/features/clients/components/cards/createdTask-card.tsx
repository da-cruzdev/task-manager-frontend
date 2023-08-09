"use client"

// import { Button, Card } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectTasks, selectUser } from "../../redux/clientSelectors"
import { Tasks } from "../../interfaces/tasks.interfaces"
import { Link } from "react-router-dom"
import { List, ListItem, ListItemPrefix, ListItemSuffix, Chip, Card, IconButton, Button } from "@material-tailwind/react"

// function TrashIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
//       <path
//         fillRule="evenodd"
//         d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
//         clipRule="evenodd"
//       />
//     </svg>
//   )
// }

function ClipboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path
        fill-rule="evenodd"
        d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z"
        clip-rule="evenodd"
      />
    </svg>
  )
}

export const CreatedTaskCard = () => {
  const [createdTasks, setCreatedTasks] = useState<Tasks[]>([])

  const tasks = useSelector(selectTasks)
  const currentUser = useSelector(selectUser)
  const sliceTasks = createdTasks.slice(0, 4)

  useEffect(() => {
    if (tasks && currentUser) {
      const userCreatedTasks = tasks.filter((task) => task.owner?.id === currentUser.id)
      setCreatedTasks(userCreatedTasks)
    }
  }, [currentUser, tasks])

  return (
    <Card className={createdTasks.length === 0 ? "w-96 h-full" : "w-96"}>
      <List>
        <ListItem className="text-lg mx-auto">
          Tâches créees
          <ListItemSuffix>
            <Chip value={createdTasks?.length} variant="ghost" size="sm" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        {sliceTasks.map((task) => (
          <ListItem ripple={false} className="py-1 pr-1 pl-4">
            <ListItemPrefix>
              <IconButton variant="text" color="blue-gray">
                <ClipboardIcon />
              </IconButton>
            </ListItemPrefix>
            {task.title}
          </ListItem>
        ))}
        <Link to="/dashboard/tasks">
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
