import { Modal, Label, TextInput, Button, Spinner } from "flowbite-react"
import React, { useEffect } from "react"
import { UsernameInput } from "../../../auth/components/form-inputs/UsernameInput"
import { useForm } from "react-hook-form"
import { EmailInput } from "../../../auth/components/form-inputs/EmailInput"
import { useSelector } from "react-redux"
import { selectUser } from "../../redux/clientSelectors"
import { UpdateUserData } from "../../interfaces/users.interfaces"
import { RootState } from "../../../../app/store"

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
    <div>
      <Modal show={open} size="lg" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-5">Modifier votre profil</h3>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <UsernameInput register={register} errors={errors} />
            <EmailInput register={register} errors={errors} />
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Ancien mot de passe" />
              </div>
              <TextInput
                {...register("oldPassword", {
                  pattern: { value: /^[A-Za-z0-9]{8,30}$/, message: "Le mot de passe doit avoir au moins 8 caractères" },
                })}
                id="oldPassword"
                type="password"
                color={errors.oldPassword && "failure"}
                helperText={
                  errors.oldPassword && (
                    <>
                      <span className="font-medium">Oops!</span>
                      {errors.oldPassword?.message}
                    </>
                  )
                }
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Nouveau mot de passe" />
              </div>
              <TextInput
                {...register("newPassword", {
                  pattern: { value: /^[A-Za-z0-9]{8,30}$/, message: "Le nouveau mot de passe doit avoir au moins 8 caractères" },
                })}
                id="newPassword"
                type="password"
                color={errors.newPassword && "failure"}
                helperText={
                  errors.newPassword && (
                    <>
                      <span className="font-medium">Oops!</span>
                      {errors.newPassword?.message}
                    </>
                  )
                }
              />
            </div>

            <Button className="mt-5" type="submit">
              {loading ? <Spinner></Spinner> : "Modifier"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
