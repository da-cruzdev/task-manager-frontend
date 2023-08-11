import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../../redux/clientSelectors"
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Input, Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react"
import Pagination from "../pagination/Pagination"
import { EnvelopeIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { useForm } from "react-hook-form"
import { UsersFilterOptions } from "../../interfaces/users.interfaces"

const TABLE_HEAD = ["Nom d'utilisateur", "Email", "Role"]

type FilterPaginationProps = {
  onPageChange: (newPage: number) => void
  onFilterChange: (filterOptions: UsersFilterOptions) => void
  totalCount: number
}

const TeamUsers: React.FC<FilterPaginationProps> = ({ onPageChange, onFilterChange, totalCount }) => {
  const [filterOptions, setFilterOptions] = useState<UsersFilterOptions>({
    query: "",
    role: "",
  })
  const [active, setActive] = React.useState(1)

  const users = useSelector(selectUsers)

  useEffect(() => {})

  const { register } = useForm()

  function handleTabClick(event: any, tabValue: string) {
    const newFilterOptions = { ...filterOptions, role: tabValue }
    setFilterOptions(newFilterOptions)
    onFilterChange(newFilterOptions)
  }

  const totalPages = totalCount

  const handlePageChange = (newPage: number) => {
    setActive(newPage)
    onPageChange(newPage)
  }

  return (
    <React.Fragment>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Membres de l'équipe
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-10 md:w-max">
              <TabsHeader>
                <Tab key="" value="" className="text-sm" onClick={(e) => handleTabClick(e, "")}>
                  Tout
                </Tab>
                <Tab key="PENDING" value="PENDING" className="text-sm" onClick={(e) => handleTabClick(e, "ADMIN")}>
                  Admin
                </Tab>
                <Tab key="IN_PROGRESS" value="IN_PROGRESS" className="text-sm" onClick={(e) => handleTabClick(e, "USER")}>
                  User
                </Tab>
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                {...register("query")}
                label="Recherche"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => {
                  const newFilterOptions = { ...filterOptions, query: e.target.value }
                  setFilterOptions(newFilterOptions)
                  onFilterChange(newFilterOptions)
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-0">
          <table className=" w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-row">
                      <Avatar
                        className=""
                        size="sm"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      />
                      <Typography variant="small" color="blue-gray" className="font-normal ml-3">
                        {user.username}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-row">
                      <EnvelopeIcon className="h-6 w-6 mr-3" color="blue-gray" />
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.email}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-row">
                      <Chip value={user.role} variant="ghost" icon={<UserCircleIcon />} color={user.role === "user" ? "blue" : "green"} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Pagination totalPages={totalPages} activePage={active} onPageChange={handlePageChange} />
        </CardFooter>
      </Card>
    </React.Fragment>
  )
}

export default TeamUsers
