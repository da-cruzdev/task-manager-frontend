import React from "react"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { Button, Chip, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react"
import { Card, Avatar } from "@material-tailwind/react"
import { Link } from "react-router-dom"

export type UserTeamProps = {
  users: User[] | null
}

export const UserTeamCard: React.FC<UserTeamProps> = ({ users }) => {
  const firstFourUsers = users ? users.slice(0, 3) : []

  return (
    <Card className="w-96">
      <List>
        <ListItem>
          Membres de l'équipe
          <ListItemSuffix>
            <Chip value={users?.length} variant="ghost" size="sm" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        {firstFourUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt="candice"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {user.username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {user.email}
              </Typography>
            </div>
          </ListItem>
        ))}

        <Link to="/dashboard/team-users">
          <Button size="sm" variant="text" className="flex items-center gap-2">
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
