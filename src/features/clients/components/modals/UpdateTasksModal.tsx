import { Modal, Label, TextInput, Textarea, Select, Button, Spinner } from "flowbite-react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import { User } from "../../../auth/interfaces/signData.interfaces"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import { RootState } from "../../../../app/store"
import { Tasks, UpdateTaskData } from "../../interfaces/tasks.interfaces"
import { selectUser } from "../../redux/clientSelectors"

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
  }, [currentUser?.id, selectedTask, setValue])

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
    <div>
      <Modal show={open} size="lg" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-3">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier la tâche</h3>
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
                readOnly={selectedTask?.assignedToId === currentUser?.id}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                {...register("description", {
                  required: "Ce champ est requis",
                  minLength: { value: 15, message: "La description doit être plus explicite et avoir au moins 15 caractères" },
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
                readOnly={selectedTask?.assignedToId === currentUser?.id}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="assignedTo" value="Assignée à" />
              </div>
              <Select
                {...register("assignedTo")}
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
                defaultValue={selectedTask?.assignedToId}
                disabled={selectedTask?.assignedToId === currentUser?.id}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" value="Statut" />
              </div>
              <Select
                {...register("status", {
                  required: "Ce champ est requis",
                })}
                id="status"
                color={errors.status && "failure"}
                helperText={
                  errors.status && (
                    <>
                      <span className="font-medium">Oops!</span>
                      {errors.status?.message}
                    </>
                  )
                }
                disabled={false}
              >
                <option value="PENDING">En attente</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="DONE">Terminé</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="deadline" value="Deadline" />
              </div>

              <Datepicker
                value={formattedDeadline}
                onChange={handleValueChange}
                minDate={formattedToday}
                disabled={selectedTask?.assignedToId === currentUser?.id}
              />
            </div>

            <div className="w-full">
              <Button onClick={handleSubmit(handleUpdateSubmit)}>{loading ? <Spinner></Spinner> : "Modifier"}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UpdateTasksModal
