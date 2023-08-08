import { Avatar, Badge, Button, Card } from "flowbite-react"
import React from "react"
import { HiUser } from "react-icons/hi"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { Link } from "react-router-dom"

export type UserTeamProps = {
  users: User[] | null
}

export const UserTeamCard: React.FC<UserTeamProps> = ({ users }) => {
  const firstFourUsers = users ? users.slice(0, 3) : []

  return (
    <div>
      <Card className="max-w-2xs h-64 md:col-span-2 md:row-span-2">
        <div className="flex justify-between">
          <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p> Membres de l'équipe </p>
          </h5>

          <Badge color="gray" className="flex" icon={HiUser} size="sm">
            <p className="font-bold">{users?.length}</p>
          </Badge>
        </div>
        <div>
          {firstFourUsers.map((user) => (
            <div key={user.id}>
              <div className="flex justify-between">
                <Avatar rounded className="mt-1" size="sm" />
                <p className="text-sm mt-3 font-bold">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/dashboard/team-users">
          <Button className="w-full">
            <p>Voir tous les utilisateurs</p>
          </Button>
        </Link>
      </Card>
    </div>
  )
}
