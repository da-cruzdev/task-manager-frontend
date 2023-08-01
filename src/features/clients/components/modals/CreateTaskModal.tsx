import { Modal, Label, TextInput, Button, Select, Textarea, Spinner } from "flowbite-react"
import React, { useEffect, useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import dayjs from "dayjs"
import { AppDispatch, RootState, useAppDispatch } from "../../../../app/store"
import { useSelector } from "react-redux"
import { createTask } from "../../redux/taskSlice"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { getAllUsers } from "../../redux/userSlice"
import { useForm } from "react-hook-form"

type TaskModalProps = {
  open: boolean
  onClose: () => void
}

type TaskFormData = {
  title: string
  description: string
  assignedTo: string
  deadline: string
}

export const useDatePicker = (initialValue: DateValueType) => {
  const [value, setValue] = useState<DateValueType>(initialValue)

  const handleChange = (newValue: DateValueType) => {
    setValue(newValue)
  }

  return {
    value,
    onChange: handleChange,
  }
}

const CreateTaskModal: React.FC<TaskModalProps> = ({ open, onClose }) => {
  const [users, setUsers] = useState<User[]>([])
  const { value, onChange } = useDatePicker({
    startDate: new Date(),
    endDate: dayjs(new Date()).add(1, "month").toDate(),
  })

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue)
    onChange(newValue)
  }

  const dispatch: AppDispatch = useAppDispatch()
  const loading = useSelector((state: RootState) => state.task.loading)

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllUsers())
        .unwrap()
        .then((data) => {
          setUsers(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchData()
  }, [dispatch])

  const today = new Date()
  const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>()

  const handleCreateTask = async (data: TaskFormData) => {
    const assignedToAsNumber = parseInt(data.assignedTo, 10)

    const endDate = typeof value?.endDate === "string" ? new Date(value.endDate) : value?.endDate

    if (!endDate) {
      console.error("Deadline is not defined.")
      return
    }

    const formattedDeadline = endDate
    const formDataWithDatePicker = {
      ...data,
      assignedTo: assignedToAsNumber,
      deadline: formattedDeadline,
    }

    dispatch(createTask(formDataWithDatePicker))
      .unwrap()
      .then((data) => {
        console.log(data)
        reset()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Modal show={open} size="lg" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Créer une tâche</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Titre" />
              </div>
              <TextInput
                {...register("title", {
                  required: "Ce champ est requis",
                  minLength: { value: 4, message: "Le titre doit avoir au moins 4 caractères" },
                })}
                id="title"
                color={errors.title && "failure"}
                helperText={
                  errors.title && (
                    <>
                      <span className="font-medium">Oops!</span>
                      {errors.title?.message}
                    </>
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                {...register("description", {
                  required: "Ce champ est requis",
                  minLength: { value: 30, message: "La description doit être plus explicite et avoir au moins 30 caractères" },
                })}
                id="description"
                rows={3}
                color={errors.description && "failure"}
                helperText={
                  errors.description && (
                    <>
                      <span className="font-medium">Oops!</span>
                      {errors.description?.message}
                    </>
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="assignedTo" value="Assignée à" />
              </div>
              <Select
                {...register("assignedTo", {
                  required: "Ce champ est requis",
                })}
                id="assignedTo"
                color={errors.assignedTo && "failure"}
                helperText={
                  errors.assignedTo && (
                    <>
                      <span className="font-medium">Oops!</span>
                      {errors.assignedTo?.message}
                    </>
                  )
                }
              >
                <option></option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deadline" value="Deadline" />
              </div>
              <Datepicker value={value} onChange={handleValueChange} minDate={formattedToday} />
            </div>

            <div className="w-full">
              <Button onClick={handleSubmit(handleCreateTask)}>{loading ? <Spinner></Spinner> : "Créer"}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CreateTaskModal
