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
// import { io } from "socket.io-client"
// import { useForm } from "react-hook-form"
// import { TasksFilterOptions } from "../../interfaces/tasks.interfaces"

// type UserProps = {
//   userEmail?: string
//   handleUpdateSubmit: (data: UpdateUserData) => void
// }

// type NavbarProps = {
//   onFilterChange: (filterOptions: TasksFilterOptions) => void
// }

// export const UserDropdown: React.FC<UserProps & { handleLogout: () => void }> = ({ userEmail, handleLogout, handleUpdateSubmit }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   return (
//     <>
//       <Dropdown inline label={<Avatar alt="User settings" rounded status="online" statusPosition="top-right" />}>
//         <Dropdown.Header>
//           <span className="block truncate text-sm font-medium">{userEmail}</span>
//         </Dropdown.Header>
//         <Dropdown.Item onClick={() => setIsModalOpen(true)}>Modifier le profil</Dropdown.Item>
//         <Dropdown.Divider />
//         <Dropdown.Item onClick={handleLogout}>Se déconnecter</Dropdown.Item>
//       </Dropdown>
//       <UpdateUserInfoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} handleUpdateSubmit={handleUpdateSubmit} />
//     </>
//   )
// }

// const NavbarComponent: React.FC<NavbarProps> = ({ onFilterChange }) => {
//   const [userData, setUserData] = useState<User | null>(null)
//   const [filterOptions, setFilterOptions] = useState<TasksFilterOptions>({
//     query: "",
//     status: "",
//   })

//   const dispatch: AppDispatch = useAppDispatch()

//   const navigate = useNavigate()

//   useEffect(() => {
//     const user = async () => {
//       dispatch(getUser())
//         .unwrap()
//         .then((data) => {
//           setUserData(data)
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     }
//     user()

//     const socket = io("http://[::1]:4000")

//     socket.on("connect", () => {
//       console.log("connected===================>")
//     })

//     socket.on("notification", (data: string) => {
//       console.log("notification:", data)
//     })

//     return () => {
//       socket.close()
//     }
//   }, [dispatch, userData?.id])

//   const onUpdateUser = (data: UpdateUserData) => {
//     dispatch(UpdateUser(data))
//       .unwrap()
//       .then((data) => {
//         setUserData(data.updatedUser)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   const onLogout = async () => {
//     if (userData?.id !== undefined)
//       dispatch(logoutUser(userData?.id))
//         .unwrap()
//         .then((response) => {
//           if (response !== undefined) {
//             navigate("/auth/login")
//             client.resetStore()
//           }
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//   }

//   const { register } = useForm()

//   return (
//     <Navbar fluid rounded>
//       <div className="flex">
//         <p className="text-md font-bold tracking-tight text-gray-900 dark:text-white mt-1">Tableau de bord</p>
//         <div className="ms-5 w-64">
//           <TextInput
//             {...register("query")}
//             id="base"
//             sizing="md"
//             type="text"
//             rightIcon={HiSearch}
//             placeholder="Recherche..."
//             onChange={(e) => {
//               const newFilterOptions = { ...filterOptions, query: e.target.value }

//               setFilterOptions(newFilterOptions)
//               onFilterChange(newFilterOptions)
//             }}
//           />
//         </div>
//         <div className="ms-5 w-50">
//           <Select
//             {...register("status")}
//             id="status"
//             placeholder="Statut"
//             onChange={(e) => {
//               const newFilterOptions = { ...filterOptions, status: e.currentTarget.value }

//               setFilterOptions(newFilterOptions)
//               onFilterChange(newFilterOptions)
//             }}
//           >
//             <option value="">Filtre </option>
//             <option value="PENDING">En attente</option>
//             <option value="IN_PROGRESS">En cours</option>
//             <option value="DONE">Terminé</option>
//           </Select>
//         </div>
//       </div>

//       <div className="flex justify-between">
//         <span className="block truncate text-sm font-medium me-3 mt-2">{userData?.username}</span>
//         <Badge icon={HiBell} size="2xl" className="me-2 mt-1" color="white" spellCheck={false} />

//         <UserDropdown userEmail={userData?.email} handleLogout={onLogout} handleUpdateSubmit={onUpdateUser} />
//       </div>
//     </Navbar>
//   )
// }

// export default NavbarComponent

import { Navbar, Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react"
import { UserCircleIcon, ChevronDownIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/outline"

type UserProps = {
  user: User | null
  handleLogout: () => void
  handleUpdateSubmit: (data: UpdateUserData) => void
}
export const ProfileMenu: React.FC<UserProps> = ({ user, handleLogout, handleUpdateSubmit }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="lg:ml-auto">
        <Typography variant="h6">{user?.username}</Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {user?.email}
        </Typography>
      </div>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-5">
            <Avatar
              variant="circular"
              size="md"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon strokeWidth={2.5} className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          <MenuItem key="Mon profil" className="flex items-center gap-2 rounded">
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
      <UpdateUserInfoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} handleUpdateSubmit={handleUpdateSubmit} />
    </>
  )
}

export default function ComplexNavbar() {
  const [userData, setUserData] = useState<User | null>(null)

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
    <Navbar className="mx-auto max-w-full-xl p-2 lg lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">Tableau de bord</Typography>

        {/* <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block"></div> */}

        <ProfileMenu user={userData} handleLogout={onLogout} handleUpdateSubmit={onUpdateUser} />
      </div>
    </Navbar>
  )
}
