import { Modal, Button } from "flowbite-react"
import { HiOutlineExclamationCircle } from "react-icons/hi"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => (
  <Modal show={isOpen} size="md" popup onClose={onClose}>
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Voulez-vous vraimnet supprimer cette tâche ?</h3>
        <div className="flex justify-center gap-4">
          <Button color="failure" onClick={onConfirm}>
            Oui, supprimer
          </Button>
          <Button color="gray" onClick={onClose}>
            Annuler
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
)
