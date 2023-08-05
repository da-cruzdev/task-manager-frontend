import { Table, Badge } from "flowbite-react"
import React, { useEffect } from "react"
import { HiQuestionMarkCircle, HiMail, HiUser, HiClipboardCheck, HiClipboardList } from "react-icons/hi"
import { useSelector } from "react-redux"
import { selectTasks, selectUsers } from "../../redux/clientSelectors"

const TeamUsers = () => {
  const users = useSelector(selectUsers)
  const tasks = useSelector(selectTasks)

  useEffect(() => {})

  const countCreatedTasks = (userId: number) => {
    return tasks?.filter((task) => task.owner.id === userId).length
  }

  const countAssignedTasks = (userId: number) => {
    return tasks?.filter((task) => task.assignedToId === userId).length
  }

  return (
    <React.Fragment>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">Membres de l'équipe</h1>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Nom d'utilisateur</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Rôle</Table.HeadCell>
          <Table.HeadCell>Tâches créees</Table.HeadCell>
          <Table.HeadCell>Tâches assignées</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users &&
            users.map((user) => (
              <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiUser} className="mr-1" size="sm" color="gray" />
                    {user.username}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiMail} className="mr-1" size="sm" color="gray" />
                    {user.email}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiQuestionMarkCircle} className="mr-1" size="sm" color="gray" />
                    {user.role}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiClipboardCheck} className="mr-1" size="sm" color="gray" />
                    {countCreatedTasks(user.id)}
                  </div>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <div className="flex">
                    <Badge icon={HiClipboardList} className="mr-1" size="sm" color="gray" />
                    {countAssignedTasks(user.id)}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}

export default TeamUsers
