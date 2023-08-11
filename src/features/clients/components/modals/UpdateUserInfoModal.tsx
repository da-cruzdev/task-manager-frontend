// import { Modal, Label, TextInput, Button, Spinner } from "flowbite-react"
import React, { useEffect } from "react"
import { UsernameInput } from "../../../auth/components/form-inputs/UsernameInput"
import { useForm } from "react-hook-form"
import { EmailInput } from "../../../auth/components/form-inputs/EmailInput"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/clientSelectors"
import { UpdateUserData } from "../../interfaces/users.interfaces"
import { RootState } from "../../../../app/store"
import { Dialog, CardHeader, Typography, CardBody, Input, CardFooter, Card, Button, Spinner } from "@material-tailwind/react"

type ModalProps = {
  open: boolean
  onClose: () => void
  handleUpdateSubmit: (data: UpdateUserData) => void
}

export const UpdateUserInfoModal: React.FC<ModalProps> = ({ open, onClose, handleUpdateSubmit }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const currentUser = useSelector(selectUser)

  useEffect(() => {
    if (currentUser) {
      setValue("username", currentUser.username)
      setValue("email", currentUser.email)
    }
  })

  const loading = useSelector((state: RootState) => state.user.loading)

  const handleFormSubmit = (data: UpdateUserData) => {
    if (data) {
      handleUpdateSubmit(data)
    }
  }
  return (
    <>
      <Dialog open={open} handler={onClose} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader variant="filled" color="blue" className="mb-4 grid h-14 place-items-center">
            <Typography variant="h5" color="white">
              Modifier le profil
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <UsernameInput register={register} errors={errors} />
            <EmailInput register={register} errors={errors} />
            <Input
              label="Ancien mot de passe"
              size="lg"
              type="password"
              {...register("oldPassword", {
                pattern: { value: /^[A-Za-z0-9]{8,30}$/, message: "Le mot de passe doit avoir au moins 8 caractères" },
              })}
              error={errors.oldPassword ? true : false}
            />
            {errors.oldPassword && (
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.oldPassword?.message}
              </Typography>
            )}
            <Input
              label="Nouveau mot de passe"
              size="lg"
              type="password"
              {...register("newPassword", {
                pattern: { value: /^[A-Za-z0-9]{8,30}$/, message: "Le mot de passe doit avoir au moins 8 caractères" },
              })}
              error={errors.newPassword ? true : false}
            />
            {errors.newPassword && (
              <Typography variant="small" color="red" className="flex items-center gap-1 font-normal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-mt-px h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.newPassword?.message}
              </Typography>
            )}

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
          </CardBody>
          <CardFooter className="flex mx-auto">
            <Button variant="gradient" onClick={handleSubmit(handleFormSubmit)} className="mr-5">
              {loading ? <Spinner></Spinner> : "Modifier"}
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
