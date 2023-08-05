import { Label, TextInput } from "flowbite-react"
import React from "react"

export const ConfirmPasswordInput = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor="confirmPassword" value="Confirmez votre mot de passe" />
      </div>
      <TextInput
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
