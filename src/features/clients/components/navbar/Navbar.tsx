"use client"

import { Navbar, TextInput, Avatar, Dropdown } from "flowbite-react"
import { HiSearch } from "react-icons/hi"
import React, { useEffect, useState } from "react"
import { getUser } from "../../redux/clientSlice"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { logoutUser } from "../../redux/userSlice"
import { useNavigate } from "react-router-dom"

type UserProps = {
  userEmail?: string
}

export const UserDropdown: React.FC<UserProps & { handleLogout: () => void }> = ({ userEmail, handleLogout }) => {
  return (
    <Dropdown inline label={<Avatar alt="User settings" rounded />}>
      <Dropdown.Header>
        <span className="block truncate text-sm font-medium">{userEmail}</span>
      </Dropdown.Header>
      <Dropdown.Item>Modifier le profil</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleLogout}>Se déconnecter</Dropdown.Item>
    </Dropdown>
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
  }, [dispatch])

  const onLogout = async () => {
    if (userData?.id !== undefined)
      dispatch(logoutUser(userData?.id))
        .unwrap()
        .then((response) => {
          if (response !== undefined) {
            navigate("/auth/login")
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
        <UserDropdown userEmail={userData?.email} handleLogout={onLogout} />
      </div>
    </Navbar>
  )
}
