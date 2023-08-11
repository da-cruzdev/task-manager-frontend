import { Dialog, DialogBody, DialogFooter, DialogHeader, Typography, Button } from "@material-tailwind/react"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => (
  // <Modal show={isOpen} size="md" popup onClose={onClose}>
  //   <Modal.Header />
  //   <Modal.Body>
  //     <div className="text-center">
  //       <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
  //       <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Voulez-vous vraimnet supprimer cette tâche ?</h3>
  //       <div className="flex justify-center gap-4">
  //         <Button color="failure" onClick={onConfirm}>
  //           Oui, supprimer
  //         </Button>
  //         <Button color="gray" onClick={onClose}>
  //           Annuler
  //         </Button>
  //       </div>
  //     </div>
  //   </Modal.Body>
  // </Modal>
  <Dialog open={isOpen} handler={onClose} size="sm">
    <DialogHeader>
      <Typography variant="h5" color="blue-gray">
        Attention!!!
      </Typography>
    </DialogHeader>
    <DialogBody divider className="grid place-items-center gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-16 w-16 text-red-500">
        <path
          fillRule="evenodd"
          d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
          clipRule="evenodd"
        />
      </svg>
      <Typography color="red" variant="h5">
        Voulez-vous vraiment supprimer cette tâche????
      </Typography>
    </DialogBody>
    <DialogFooter className="space-x-2">
      <Button variant="text" color="blue-gray" onClick={onClose}>
        Annuler
      </Button>
      <Button variant="filled" color="red" onClick={onConfirm}>
        Oui, Supprimer
      </Button>
    </DialogFooter>
  </Dialog>
)
