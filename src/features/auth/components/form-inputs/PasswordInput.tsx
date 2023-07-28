import { Label, TextInput } from "flowbite-react"

export const PasswordInput = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="password" value="Your password" />
      </div>
      <TextInput
        {...register("password", {
          required: "Ce champ est requis",
          pattern: { value: /^[A-Za-z0-9]{8,30}$/, message: "Le mot de passe doit avoir au moins 8 caractères" },
        })}
        id="password"
        type="password"
        color={errors.password && "failure"}
        helperText={
          errors.password && (
            <>
              <span className="font-medium">Oops!</span>
              {errors.password?.message}
            </>
          )
        }
      />
    </div>
  )
}
