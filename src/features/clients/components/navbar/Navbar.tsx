"use client"

import { Navbar, TextInput, Avatar, Dropdown } from "flowbite-react"
import { HiSearch } from "react-icons/hi"
import { useSelector } from "react-redux"
import { selectSignupData } from "../../../auth/containers/signup/signup-selector"
import React, { useEffect, useState } from "react"
import { SignResponse } from "../../../auth/interfaces/signData.interfaces"

type UserProps = {
  userId?: number
  userName?: string
  userEmail?: string
}

export const UserDropdown: React.FC<UserProps> = ({ userEmail }) => {
  return (
    <Dropdown inline label={<Avatar alt="User settings" rounded />}>
      <Dropdown.Header>
        <span className="block truncate text-sm font-medium">{userEmail}</span>
      </Dropdown.Header>
      <Dropdown.Item>Modifier le profil</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign out</Dropdown.Item>
    </Dropdown>
  )
}

export default function NavbarComponent() {
  const [userData, setUserData] = useState<SignResponse | null>(null)

  const data = useSelector(selectSignupData)
  useEffect(() => {
    return setUserData(data)
  }, [data])
  console.log(userData?.user)

  return (
    <Navbar fluid rounded>
      <div className="flex">
        <p className="text-md font-bold tracking-tight text-gray-900 dark:text-white mt-1">Tableau de bord</p>
        <div className="ms-11 w-64">
          <TextInput id="base" sizing="md" type="text" rightIcon={HiSearch} />
        </div>
      </div>

      <div className="flex">
        {userData ? <span className="block truncate text-sm font-medium me-3 mt-2">{userData.user.username}</span> : null}
        <UserDropdown userEmail={userData?.user.email} />
      </div>
    </Navbar>
  )
}
