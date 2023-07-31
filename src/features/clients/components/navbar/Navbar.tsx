"use client"

import { Navbar, TextInput, Avatar, Dropdown } from "flowbite-react"
import { HiSearch } from "react-icons/hi"
import { useSelector } from "react-redux"
import { selectSignupData } from "../../../auth/containers/signup/signup-selector"
import React, { useEffect, useState } from "react"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { getUser } from "../../redux/clientSlice"
import { AppDispatch, RootState, useAppDispatch } from "../../../../app/store"
import { selectSigninData } from "../../../auth/containers/signin/signin.selector"
import { setUser } from "../../redux/userSlice"

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
      <Dropdown.Item>Se déconnecter</Dropdown.Item>
    </Dropdown>
  )
}

export default function NavbarComponent() {
  const [userData, setUserData] = useState<User | null>(null)

  const signupData = useSelector(selectSignupData)
  const signinData = useSelector(selectSigninData)
  const email = signinData?.user.email || signupData?.user.email

  const dispatch: AppDispatch = useAppDispatch()
  useEffect(() => {
    const data = async () => {
      if (email) {
        try {
          const user = await dispatch(getUser(email)).unwrap()
          dispatch(setUser(user))

          setUserData(user)
        } catch (error) {
          console.log(error)
        }
      }
    }
    data()
  }, [dispatch, email, userData])

  const user = useSelector((state: RootState) => state.user.data)

  return (
    <Navbar fluid rounded>
      <div className="flex">
        <p className="text-md font-bold tracking-tight text-gray-900 dark:text-white mt-1">Tableau de bord</p>
        <div className="ms-11 w-64">
          <TextInput id="base" sizing="md" type="text" rightIcon={HiSearch} />
        </div>
      </div>

      <div className="flex">
        <span className="block truncate text-sm font-medium me-3 mt-2">{user?.username}</span>
        <UserDropdown userEmail={user?.email} />
      </div>
    </Navbar>
  )
}
