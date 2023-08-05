import { Label, TextInput } from "flowbite-react"

export const EmailInput = ({ register, errors }: { register: any; errors: any }) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="email1" value="Votre email" />
      </div>
      <TextInput
        {...register("email", {
          required: "Ce champ est requis",
          pattern: { value: /^[A-Za-z0-9_.-]+@[A-Za-z_-]+\.[A-Za-z_-]{2,4}$/, message: "Entrez un email valide" },
        })}
        id="email"
        type="email"
        color={errors.email && "failure"}
        helperText={
          errors.email && (
            <>
              <span className="font-medium">Oops!</span>
              {errors.email?.message}
            </>
          )
        }
      />
    </div>
  )
}
