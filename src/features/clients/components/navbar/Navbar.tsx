"use client"

import { Navbar, TextInput, Avatar, Dropdown } from "flowbite-react"
import { HiSearch } from "react-icons/hi"
import React, { useEffect, useState } from "react"
import { User } from "../../../auth/interfaces/signData.interfaces"

type UserProps = {
  userEmail?: string
}

export const UserDropdown: React.FC<UserProps> = ({ userEmail }) => {
  const handleLogout = async () => {}
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
  const [userData] = useState<User | null>(null)

  useEffect(() => {})

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
        <UserDropdown userEmail={userData?.email} />
      </div>
    </Navbar>
  )
}
