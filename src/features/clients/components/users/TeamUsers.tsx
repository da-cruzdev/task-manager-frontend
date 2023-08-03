import { Table } from "flowbite-react"
import React, { useEffect } from "react"
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
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.username}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.username}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.role}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white ms-9">{countCreatedTasks(user.id)}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white ms-9">{countAssignedTasks(user.id)}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}

export default TeamUsers
