import { Chip } from "@material-tailwind/react"

export const formatDate = (date: string | number | Date) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" }
  return new Date(date).toLocaleDateString("fr-FR", options)
}

function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function getStatusChipColor(status: string) {
  return status === "PENDING" ? "yellow" : status === "IN_PROGRESS" ? "blue" : status === "DONE" ? "green" : "gray"
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "PENDING":
      return "En attente"
    case "IN_PROGRESS":
      return "En cours"
    case "DONE":
      return "Terminée"
    default:
      return "Inconnu"
  }
}

export function StatusChip({ status }: { status: string }) {
  return <Chip value={getStatusLabel(status)} color={getStatusChipColor(status)} size="sm" variant="ghost" icon={<Icon />} />
}
