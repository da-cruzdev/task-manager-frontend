import { Modal, Label, TextInput, Textarea, Select, Button, Spinner, FileInput } from "flowbite-react"
import React from "react"
import { UsernameInput } from "../../../auth/components/form-inputs/UsernameInput"
import { useForm } from "react-hook-form"
import { EmailInput } from "../../../auth/components/form-inputs/EmailInput"
import { PasswordInput } from "../../../auth/components/form-inputs/PasswordInput"
import { ConfirmPasswordInput } from "../../../auth/components/form-inputs/ConfirmPasswordInput"

type ModalProps = {
  open: boolean
  onClose: () => void
}

export const UpdateUserInfoModal: React.FC<ModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm()
  return (
    <div>
      <Modal show={open} size="lg" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-5">Modifier votre profil</h3>
          </div>
          <form className="flex flex-col gap-4">
            <UsernameInput register={register} errors={formErrors} />
            <EmailInput register={register} errors={formErrors} />
            <PasswordInput register={register} errors={formErrors} />
            <ConfirmPasswordInput register={register} errors={formErrors} />

            <Button className="mt-5" type="submit">
              Modifier
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
