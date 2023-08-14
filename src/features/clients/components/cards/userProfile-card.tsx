import React, { useEffect } from "react"
import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip, Dialog } from "@material-tailwind/react"
import { User } from "../../../auth/interfaces/signData.interfaces"

type UserProfileProps = {
  open: boolean
  onClose: () => void | boolean
  selectedUser: User | null
}

const UserProfileCard: React.FC<UserProfileProps> = ({ open, onClose, selectedUser }) => {
  useEffect(() => {})

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <Card className="mx-auto w-full max-w-[32rem]">
        <CardHeader floated={false} className="h-80">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt=""
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {selectedUser?.username || "Nom"}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {selectedUser?.email || "CEO / Co-Founder"}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip content="Like">
            <Typography as="a" href="#facebook" variant="lead" color="blue" textGradient>
              <i className="fab fa-facebook" />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography as="a" href="#twitter" variant="lead" color="light-blue" textGradient>
              <i className="fab fa-twitter" />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography as="a" href="#instagram" variant="lead" color="purple" textGradient>
              <i className="fab fa-instagram" />
            </Typography>
          </Tooltip>
        </CardFooter>
      </Card>
    </Dialog>
  )
}

export default UserProfileCard
