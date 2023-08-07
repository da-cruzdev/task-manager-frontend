"use client"

import { Navbar, TextInput, Avatar, Dropdown } from "flowbite-react"
import { HiSearch } from "react-icons/hi"
import React, { useEffect, useState } from "react"
import { getUser } from "../../redux/clientSlice"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { UpdateUser, logoutUser } from "../../redux/userSlice"
import { useNavigate } from "react-router-dom"
import client from "../../../../app/graphql"
import { UpdateUserInfoModal } from "../modals/UpdateUserInfoModal"
import { UpdateUserData } from "../../interfaces/users.interfaces"

type UserProps = {
  userEmail?: string
  handleUpdateSubmit: (data: UpdateUserData) => void
}

export const UserDropdown: React.FC<UserProps & { handleLogout: () => void }> = ({ userEmail, handleLogout, handleUpdateSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Dropdown inline label={<Avatar alt="User settings" rounded status="online" statusPosition="top-right" />}>
        <Dropdown.Header>
          <span className="block truncate text-sm font-medium">{userEmail}</span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => setIsModalOpen(true)}>Modifier le profil</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>Se déconnecter</Dropdown.Item>
      </Dropdown>
      <UpdateUserInfoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} handleUpdateSubmit={handleUpdateSubmit} />
    </>
  )
}

export default function NavbarComponent() {
  const [userData, setUserData] = useState<User | null>(null)
  const dispatch: AppDispatch = useAppDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    const user = async () => {
      dispatch(getUser())
        .unwrap()
        .then((data) => {
          setUserData(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    user()

    // const socket = io("http://localhost:4000")

    // socket.on("connect", () => {
    //   console.log("connected===================>")
    // })

    // socket.emit("message", " Wilfried", (data: string) => {
    //   console.log(data)
    // })

    // socket.on("notification", (data: any) => {
    //   console.log("notification:", data)
    // })

    // return () => {
    //   socket.close()
    // }
  }, [dispatch])

  const onUpdateUser = (data: UpdateUserData) => {
    dispatch(UpdateUser(data))
      .unwrap()
      .then((data) => {
        console.log(data)

        setUserData(data.updatedUser)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onLogout = async () => {
    if (userData?.id !== undefined)
      dispatch(logoutUser(userData?.id))
        .unwrap()
        .then((response) => {
          if (response !== undefined) {
            navigate("/auth/login")
            client.resetStore()
          }
        })
        .catch((err) => {
          console.log(err)
        })
  }

  return (
    <Navbar fluid rounded>
      <div className="flex">
        <p className="text-md font-bold tracking-tight text-gray-900 dark:text-white mt-1">Tableau de bord</p>
        <div className="ms-11 w-64">
          <TextInput id="base" sizing="md" type="text" rightIcon={HiSearch} />
        </div>
      </div>

      <div className="flex">
        <span className="block truncate text-sm font-medium me-3 mt-2">{userData?.username}</span>
        <UserDropdown userEmail={userData?.email} handleLogout={onLogout} handleUpdateSubmit={onUpdateUser} />
      </div>
    </Navbar>
  )
}
