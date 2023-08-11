import React, { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import { User } from "../../../auth/interfaces/signData.interfaces"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import { Tasks, UpdateTaskData } from "../../interfaces/tasks.interfaces"
import { selectUser } from "../../redux/clientSelectors"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Input,
  Select,
  Textarea,
  Typography,
  Option,
  Spinner,
} from "@material-tailwind/react"

type TaskModalProps = {
  open: boolean
  onClose: () => void
  users: User[]
  onSubmit: (data: UpdateTaskData) => void
}

const UpdateTasksModal: React.FC<TaskModalProps & { selectedTask: Tasks | null }> = ({ open, onClose, users, selectedTask, onSubmit }) => {
  const [formattedDeadline, setFormattedDeadline] = useState<DateValueType>({
    startDate: selectedTask?.deadline ? dayjs(selectedTask.deadline).toDate() : new Date(),
    endDate: selectedTask?.deadline ? dayjs(selectedTask.deadline).toDate() : dayjs(new Date()).add(1, "month").toDate(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm()
  const currentUser = useSelector(selectUser)

  const loading = useSelector((state: RootState) => state.task.loading)
  const today = new Date()
  const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const handleValueChange = (newValue: DateValueType) => {
    console.log("newValue:", newValue)
    setFormattedDeadline(newValue)
  }

  useEffect(() => {
    if (selectedTask) {
      setValue("title", selectedTask.title)
      setValue("description", selectedTask.description)
      setValue("status", selectedTask.status)
      setFormattedDeadline({
        startDate: selectedTask.deadline ? dayjs(selectedTask.deadline).toDate() : new Date(),
        endDate: selectedTask.deadline ? dayjs(selectedTask.deadline).toDate() : dayjs(new Date()).add(1, "month").toDate(),
      })
    }
  }, [currentUser?.id, selectedTask, setValue, users])

  const handleUpdateSubmit = (data: UpdateTaskData) => {
    const endDate = typeof formattedDeadline?.endDate === "string" ? new Date(formattedDeadline.endDate) : formattedDeadline?.endDate
    const newDeadline = endDate

    if (selectedTask) {
      const assignedToAsNumber = Number(data.assignedTo)
      let oldAssignerTo
      if (selectedTask?.assignedToId === currentUser?.id) {
        oldAssignerTo = currentUser?.id
      }

      const updateData: UpdateTaskData | any = {
        id: selectedTask?.id,
        data: { ...data, assignedTo: assignedToAsNumber || oldAssignerTo, deadline: newDeadline },
      }
      onSubmit(updateData)
    }
  }

  return (
    <>
      <Dialog open={open} handler={onClose} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[48rem]">
          <CardHeader variant="filled" color="blue" className="mb-4 grid h-14 place-items-center">
            <Typography variant="h5" color="white">
              Modifier la tâche
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
              disabled={selectedTask?.assignedToId === currentUser?.id}
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
              disabled={selectedTask?.assignedToId === currentUser?.id}
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
              defaultValue={selectedTask?.assignedToId?.toString()}
              render={({ field: { value, onChange }, fieldState }) => (
                <Select
                  label="Assignée à"
                  value={value}
                  error={fieldState.error ? true : false}
                  onChange={onChange}
                  disabled={selectedTask?.assignedToId === currentUser?.id}
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
            <Controller
              control={control}
              name="status"
              render={({ field: { value, onChange }, fieldState }) => (
                <Select label="Statut" value={value} error={fieldState.error ? true : false} onChange={onChange}>
                  <Option key="PENDING" value="PENDING">
                    En attente
                  </Option>
                  <Option key="IN_PROGRESS" value="IN_PROGRESS">
                    En cours
                  </Option>
                  <Option key="DONE" value="DONE">
                    Terminée
                  </Option>
                </Select>
              )}
            />

            <Datepicker
              placeholder="Deadline"
              value={formattedDeadline}
              onChange={handleValueChange}
              minDate={formattedToday}
              disabled={selectedTask?.assignedToId === currentUser?.id}
            />
          </CardBody>
          <CardFooter className="flex mx-auto">
            <Button variant="gradient" onClick={handleSubmit(handleUpdateSubmit)} className="mr-5">
              {loading ? <Spinner /> : "Modifier"}
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

export default UpdateTasksModal
