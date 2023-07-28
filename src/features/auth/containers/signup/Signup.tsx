"use client"
import React from "react"
import { Button, Card, Spinner } from "flowbite-react"
import { useForm } from "react-hook-form"
import { EmailInput } from "../../components/form-inputs/EmailInput"
import { PasswordInput } from "../../components/form-inputs/PasswordInput"
import { UsernameInput } from "../../components/form-inputs/UsernameInput"

export const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isValid },
  } = useForm()

  const formSubmit = () => {}

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <Card className="container max-w-lg mx-auto">
          {/* <img className="max-w-xs mx-auto" alt="..." src={logo} /> */}

          <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
            <p>Signup</p>
          </h5>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(formSubmit)}>
            <UsernameInput register={register} errors={formErrors} />
            <EmailInput register={register} errors={formErrors} />
            <PasswordInput register={register} errors={formErrors} />

            {/* <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div> */}
            <Button className="mt-5" type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
