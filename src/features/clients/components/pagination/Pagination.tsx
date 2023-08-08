"use client"

import { Pagination } from "flowbite-react"
import { useState } from "react"

export default function TableDataNavigation() {
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page: number) => setCurrentPage(page)

  return (
    <div className="flex items-center justify-center text-center">
      <Pagination currentPage={currentPage} layout="table" onPageChange={onPageChange} totalPages={200} />
    </div>
  )
}
