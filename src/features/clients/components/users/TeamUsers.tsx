import { Table } from "flowbite-react"
import React from "react"

const TeamUsers = () => {
  return (
    <React.Fragment>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">Membres de l'équipe</h1>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Nom d'utilisateur</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Rôle</Table.HeadCell>
          <Table.HeadCell>Tâches créees</Table.HeadCell>
          <Table.HeadCell>Tâches assignées</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"></Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"></Table.Row>
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}

export default TeamUsers
