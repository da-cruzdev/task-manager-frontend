import { Table } from "flowbite-react"
import React from "react"

const AssignedTasks = () => {
  return (
    <React.Fragment>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">Tâches assignées</h1>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Titre</Table.HeadCell>
          <Table.HeadCell>Descrption</Table.HeadCell>
          <Table.HeadCell>Statut</Table.HeadCell>
          <Table.HeadCell>Deadline</Table.HeadCell>
          <Table.HeadCell>Owner</Table.HeadCell>
          <Table.HeadCell>Date de création</Table.HeadCell>
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

export default AssignedTasks
