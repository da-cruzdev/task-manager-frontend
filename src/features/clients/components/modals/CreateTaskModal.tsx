import React, { useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import { RootState } from "../../../../app/store"
import { useSelector } from "react-redux"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { Controller, useForm } from "react-hook-form"
import { CreateTaskData } from "../../interfaces/tasks.interfaces"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Option,
  Dialog,
  Input,
  Select,
  Textarea,
  Typography,
  Spinner,
} from "@material-tailwind/react"

type TaskModalProps = {
  open: boolean
  onClose: () => void
  users: User[]
  onSubmit: (data: CreateTaskData) => void
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

  const resetDatePicker = () => {
    setValue(initialValue)
  }

  return {
    value,
    onChange: handleChange,
    resetDatePicker,
  }
}

const CreateTaskModal: React.FC<TaskModalProps> = ({ open, onClose, users, onSubmit }) => {
  const { value, onChange, resetDatePicker } = useDatePicker(null)

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue)
    onChange(newValue)
  }

  const loading = useSelector((state: RootState) => state.task.loading)

  const today = new Date()
  const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const {
    register,
    handleSubmit,
    reset,
    control,
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

    if (formDataWithDatePicker) {
      onSubmit(formDataWithDatePicker)

      reset({ title: "", description: "", assignedTo: "", deadline: "" })
      resetDatePicker()
    }
  }

  return (
    <>
      <Dialog open={open} handler={onClose} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[48rem]">
          <CardHeader variant="filled" color="blue" className="mb-4 grid h-14 place-items-center">
            <Typography variant="h5" color="white">
              Créer une nouvelle tâche
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Titre"
              size="lg"
              {...register("title", {
                required: "Le titre est obligatoire",
                minLength: { value: 4, message: "Le titre doit avoir au moins 4 caractères" },
              })}
              error={errors.title ? true : false}
            />
            {errors.title && (
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.title?.message}
              </Typography>
            )}

            <Textarea
              label="Description"
              {...register("description", {
                required: "Veuillez mettre une description",
                minLength: { value: 15, message: "La description doit être plus explicite et avoir au moins 15 caractères" },
              })}
              error={errors.description ? true : false}
            />
            {errors.description && (
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.description?.message}
              </Typography>
            )}
            <Controller
              control={control}
              name="assignedTo"
              rules={{ required: "Veuillez sélectionner un utilisateur" }}
              render={({ field: { value, onChange }, fieldState }) => (
                <Select
                  label="Assignée à"
                  value={value}
                  error={fieldState.error ? true : false}
                  onChange={(selectedValue) => {
                    onChange(selectedValue)
                  }}
                >
                  {users.map((user) => (
                    <Option key={user.id} value={user.id.toString()}>
                      {user.username}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.assignedTo && (
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.assignedTo?.message}
              </Typography>
            )}

            <Datepicker placeholder="Deadline" value={value} onChange={handleValueChange} minDate={formattedToday} />
          </CardBody>
          <CardFooter className="flex mx-auto">
            <Button variant="gradient" onClick={handleSubmit(handleCreateTask)} className="mr-5">
              {loading ? <Spinner /> : "Créer"}
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Annuler
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  )
}

export default CreateTaskModal
