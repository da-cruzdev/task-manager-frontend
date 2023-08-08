import React from "react"
import { Card } from "flowbite-react"
import { Line } from "react-chartjs-2"
import { CategoryScale, Chart, registerables } from "chart.js"
Chart.register(...registerables, CategoryScale)

const TasksProgression = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Tasks Progression",
        data: [12, 19, 3, 5, 2, 3, 10],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  }

  return (
    <div>
      <Card className="max-w-4xl h-64">
        <h5 className="text-1xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">Progression</h5>
        <div className="mx-auto w-100">
          <Line data={data} />
        </div>
      </Card>
    </div>
  )
}

export default TasksProgression
