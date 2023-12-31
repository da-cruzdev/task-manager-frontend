import { IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography } from "@material-tailwind/react"
import { PlusIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline"

export const DefaultSpeedDial = () => {
  const labelProps = {
    variant: "small",
    color: "blue",
    className: "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal",
  }

  return (
    <div className="relative">
      <div className="absolute top-0 right-0">
        <SpeedDial placement="right">
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction>
              <ClipboardDocumentIcon className="h-5 w-5" />
              <Typography {...labelProps}>Créer une tâche</Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  )
}
