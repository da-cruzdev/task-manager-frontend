import { Avatar, Badge, Card } from "flowbite-react"
import React from "react"
import { HiUser } from "react-icons/hi"
import { User } from "../../../auth/interfaces/signData.interfaces"

export type UserTeamProps = {
  users: User[]
}

export const UserTeamCard: React.FC<UserTeamProps> = ({ users }) => {
  return (
    <div>
      <Card className="max-w-2xs h-64 md:col-span-2 md:row-span-2">
        <div className="flex justify-between">
          <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p> Membres de l'équipe </p>
          </h5>

          <Badge color="gray" className="flex" icon={HiUser} size="sm">
            <p className="font-bold">{users.length}</p>
          </Badge>
        </div>
        <div>
          {users.map((user) => (
            <div key={user.id}>
              <div className="flex justify-between">
                <Avatar rounded className="mt-3" size="sm" />
                <p className="text-sm mt-5">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
