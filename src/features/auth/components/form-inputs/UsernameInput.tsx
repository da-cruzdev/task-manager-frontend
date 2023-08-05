import { Label, TextInput } from "flowbite-react"

export const UsernameInput = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="username" value="Votre nom d'utilisateur" />
      </div>
      <TextInput
        {...register("username", { required: "Ce champ est requis", minLength: { value: 4, message: "Le nom doit avoir au moins 4" } })}
        id="username"
        type="text"
        color={errors.username && "failure"}
        helperText={
          errors.username && (
            <>
              <span className="font-medium">Oops!</span>
              {errors.username?.message}
            </>
          )
        }
      />
    </div>
  )
}
