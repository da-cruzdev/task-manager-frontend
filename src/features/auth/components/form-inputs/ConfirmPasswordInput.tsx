import { Input } from "@material-tailwind/react"
import React from "react"

export const ConfirmPasswordInput = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <>
      <Input
        {...register("confirmPassword", {
          required: "Ce champ est requis",
          pattern: { value: /^[A-Za-z0-9]{8,30}$/, message: "Le mot de passe doit avoir au moins 8 caractères" },
        })}
        id="confirmPassword"
        type="password"
        color={errors.confirmPassword && "failure"}
        helperText={
          errors.confirmPassword && (
            <>
              <span className="font-medium">Oops!</span>
              {errors.confirmPassword?.message}
            </>
          )
        }
      />
    </>
  )
}
