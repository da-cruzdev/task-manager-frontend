import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
import { Button, IconButton } from "@material-tailwind/react"
import React from "react"

type PaginationProps = {
  totalPages: number
  activePage: number
  onPageChange: (newPage: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, activePage, onPageChange }) => {
  return (
    <div className="flex items-center gap-4 mx-auto">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={() => onPageChange(activePage - 1)}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <IconButton
            key={index}
            onClick={() => onPageChange(index + 1)}
            className="rounded-full"
            color={activePage === index + 1 ? "blue" : "gray"}
            variant={activePage === index + 1 ? "filled" : "text"}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default Pagination
