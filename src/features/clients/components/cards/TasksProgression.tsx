import React, { useEffect, useState } from "react"
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import { ComposedChart, XAxis, YAxis, CartesianGrid, Area, Tooltip, Legend, Bar, Line } from "recharts"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { PaginationOptions, Tasks, TasksFilterOptions } from "../../interfaces/tasks.interfaces"
import { getAssignedTasks, getCreatedTasks } from "../../redux/taskSlice"

const TasksProgression = () => {
  const [createdTasks, setCreatedTasks] = useState<Tasks[]>([])
  const [assignedTasks, setAssignedTasks] = useState<Tasks[]>([])
  const [filterOptions] = useState<TasksFilterOptions>({
    query: "",
    status: "",
  })
  const [paginationOptions] = useState<PaginationOptions>({
    take: 5,
    skip: 0,
  })

  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    const fetchCreatedTasks = () => {
      dispatch(getCreatedTasks({ filterOptions, paginationOptions }))
        .unwrap()
        .then((data) => {
          const tasks = data.data
          setCreatedTasks(tasks)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const fetchAssignedTasks = () => {
      dispatch(getAssignedTasks({ filterOptions, paginationOptions }))
        .unwrap()
        .then((data) => {
          const tasks = data.data
          setAssignedTasks(tasks)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchAssignedTasks()

    fetchCreatedTasks()
  })

  const data = [
    {
      name: "En attente",
      created: createdTasks?.filter((task) => task?.status === "PENDING").length,
      assigned: assignedTasks?.filter((task) => task?.status === "PENDING").length,
      completed:
        createdTasks?.filter((task) => task?.status === "PENDING").length + assignedTasks?.filter((task) => task?.status === "PENDING").length,
    },
    {
      name: "En cours",
      created: createdTasks?.filter((task) => task.status === "IN_PROGRESS").length,
      assigned: assignedTasks?.filter((task) => task.status === "IN_PROGRESS").length,
      completed:
        createdTasks?.filter((task) => task.status === "IN_PROGRESS").length + assignedTasks?.filter((task) => task.status === "IN_PROGRESS").length,
    },
    {
      name: "Terminées",
      created: createdTasks?.filter((task) => task.status === "DONE").length,
      assigned: assignedTasks?.filter((task) => task.status === "DONE").length,
      completed: createdTasks?.filter((task) => task.status === "DONE").length + assignedTasks?.filter((task) => task.status === "DONE").length,
    },
  ]

  return (
    <Card className="w-full max-w-[48rem] flex mt-0">
      <CardHeader shadow={false} floated={false} className="m-0 shrink-0 rounded-r-none mx-auto">
        <Typography variant="h1" className="text-lg text-underline mt-3 text-center">
          Statistiques des tâches
        </Typography>
      </CardHeader>
      <CardBody className="mx-auto">
        <ComposedChart width={680} height={230} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar dataKey="completed" barSize={20} fill="#413ea0" name="Tâches" />
          <Line type="monotone" dataKey="created" stroke="#ff7300" name="Créees" />
          <Area type="monotone" dataKey="assigned" fill="#8884d8" stroke="#8884d8" name="Assignées" />
        </ComposedChart>
      </CardBody>
    </Card>
  )
}

export default TasksProgression
