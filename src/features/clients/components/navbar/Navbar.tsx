"use client"

import React, { useEffect, useState } from "react"
import { getUser } from "../../redux/clientSlice"
import { AppDispatch, useAppDispatch } from "../../../../app/store"
import { User } from "../../../auth/interfaces/signData.interfaces"
import { UpdateUser, logoutUser } from "../../redux/userSlice"
import { useNavigate } from "react-router-dom"
import client from "../../../../app/graphql"
import { UpdateUserInfoModal } from "../modals/UpdateUserInfoModal"
import { UpdateUserData } from "../../interfaces/users.interfaces"
import { Navbar, Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar, Chip, IconButton } from "@material-tailwind/react"
import { UserCircleIcon, ChevronDownIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/outline"
import { format } from "date-fns"
import fr from "date-fns/locale/fr"
import { BellIcon } from "@heroicons/react/24/solid"
import UserProfileCard from "../cards/userProfile-card"

type UserProps = {
  user: User | null
  handleLogout: () => void
  handleUpdateSubmit: (data: UpdateUserData) => void
}
export const ProfileMenu: React.FC<UserProps> = ({ user, handleLogout, handleUpdateSubmit }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userCardOpen, setUserCardOpen] = useState(false)

  return (
    <>
      <div>
        <Typography variant="h6">{user?.username || "Nom d'utilisateur inconnu"}</Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {user?.email || "Email inconnu"}
        </Typography>
      </div>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-5">
            <Avatar
              variant="circular"
              size="md"
              alt="tania andrew"
              className="border border-blue-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          <MenuItem key="Mon profil" className="flex items-center gap-2 rounded" onClick={() => setUserCardOpen(true)}>
            <UserCircleIcon className="h-4 w-4" strokeWidth={2} />
            <Typography as="span" variant="small" className="font-normal">
              Mon profil
            </Typography>
          </MenuItem>
          <MenuItem key="Modifier mon profil" className="flex items-center gap-2 rounded" onClick={() => setIsModalOpen(true)}>
            <Cog6ToothIcon className="h-4 w-4" strokeWidth={2} />
            <Typography as="span" variant="small" className="font-normal">
              Modifier mon profil
            </Typography>
          </MenuItem>
          <MenuItem
            key="Déconnexion"
            className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
            onClick={handleLogout}
          >
            <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
            <Typography as="span" variant="small" className="font-normal" color="red">
              Déconnexion
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      <UserProfileCard open={userCardOpen} onClose={() => setUserCardOpen(false)} selectedUser={user} />
      <UpdateUserInfoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} handleUpdateSubmit={handleUpdateSubmit} />
    </>
  )
}

function Calendar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      />
    </svg>
  )
}

function Clock() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function ComplexNavbar() {
  const [userData, setUserData] = useState<User | null>(null)
  const [currentDate, setCurrentDate] = useState<string>("")
  const [currentTime, setCurrentTime] = useState<string>("")

  const dispatch: AppDispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUser())
        .unwrap()
        .then((data) => {
          setUserData(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    fetchUser()

    const now = new Date()
    const formattedDate = format(now, `EEEE, d MMMM yyyy`, { locale: fr })
    setCurrentDate(formattedDate)

    const interval = setInterval(() => {
      const now = new Date()
      const formattedTime = format(now, "HH:mm:ss")
      setCurrentTime(formattedTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  const onUpdateUser = (data: UpdateUserData) => {
    dispatch(UpdateUser(data))
      .unwrap()
      .then((data) => {
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
    <Navbar className=" mx-auto max-w-full-xl p-2 lg lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">Tableau de bord</Typography>
        <div className="absolute top-2/4 left-1/4 hidden -translate-x-2/4 -translate-y-2/4 lg:flex ">
          <Chip value={currentDate} variant="ghost" size="lg" className="cursor-pointer" icon={<Calendar />} />
          <Chip value={currentTime} variant="outlined" size="sm" className="cursor-pointer ml-5 text-md" icon={<Clock />} />
        </div>
        <IconButton variant="text" className=" lg:ml-auto mr-3">
          <BellIcon className="h-5 w-5" color="black" />
        </IconButton>
        <ProfileMenu user={userData} handleLogout={onLogout} handleUpdateSubmit={onUpdateUser} />
      </div>
    </Navbar>
  )
}
