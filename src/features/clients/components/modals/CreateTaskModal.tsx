import { Modal, Label, TextInput, Button, Select, Textarea, Spinner } from "flowbite-react"
import React, { useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import dayjs from "dayjs"
import { AppDispatch, RootState, useAppDispatch } from "../../../../app/store"
import { useSelector } from "react-redux"
import { createTask } from "../../redux/taskSlice"
import { CreateTaskData } from "../../interfaces/tasks.interfaces"

type TaskModalProps = {
  open: boolean
  onClose: () => void
}

const CreateTaskModal: React.FC<TaskModalProps> = ({ open, onClose }) => {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: dayjs(new Date()).add(1, "month").toDate(),
  })

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue)
    setValue(newValue)
  }

  const today = new Date()
  const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const dispatch: AppDispatch = useAppDispatch()
  const loading = useSelector((state: RootState) => state.task.loading)

  const handleCreateTask = async (data: CreateTaskData) => {
    const endDate = typeof value?.endDate === "string" ? new Date(value.endDate) : value?.endDate

    if (!endDate) {
      console.error("Deadline is not defined.")
      return
    }

    const formattedDeadline = endDate

    dispatch(
      createTask({
        title: "Go to office",
        description: "For the Billing sprint",
        assignedTo: 2,
        deadline: formattedDeadline,
      }),
    )
      .unwrap()
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Modal show={open} size="md" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Créer une tâche</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Titre" />
              </div>
              <TextInput id="title" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea id="description" required rows={3} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="assignedTo" value="Assignée à" />
              </div>
              <Select id="assignedTo" required>
                <option></option>
                <option>Luc</option>
                <option>Joel</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deadline" value="Deadline" />
              </div>
              <Datepicker value={value} onChange={handleValueChange} minDate={formattedToday} />
            </div>

            <div className="w-full">
              <Button onClick={handleCreateTask}>{loading ? <Spinner></Spinner> : "Créer"}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CreateTaskModal
