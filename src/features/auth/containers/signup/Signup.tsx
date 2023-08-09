"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { EmailInput } from "../../components/form-inputs/EmailInput"
import { PasswordInput } from "../../components/form-inputs/PasswordInput"
import { UsernameInput } from "../../components/form-inputs/UsernameInput"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../../app/hooks"
import { AppDispatch, RootState } from "../../../../app/store"
import { signupUser } from "./signup-slice"
import { SignData } from "../../interfaces/signData.interfaces"
import { Link, useNavigate } from "react-router-dom"
import { CardHeader, Typography, CardBody, CardFooter, Card, Button, Spinner } from "@material-tailwind/react"

export const Signup = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const loading = useSelector((state: RootState) => state.signup.loading)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm()

  const navigate = useNavigate()

  const formSubmit = async (data: SignData) => {
    dispatch(signupUser(data))
      .unwrap()
      .then((data) => {
        if (data) navigate("/dashboard")

        reset()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 mx-auto">
        <Card className="w-96 mx-auto">
          <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Inscription
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <UsernameInput register={register} errors={formErrors} />
            <EmailInput register={register} errors={formErrors} />
            <PasswordInput register={register} errors={formErrors} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit(formSubmit)}>
              {loading ? <Spinner className="mx-auto" /> : "S'enregistrer"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Vous avez déjà un compte?
              <Link to="auth/login">
                <Typography as="a" href="#signup" variant="small" color="blue" className="ml-1 font-bold">
                  Connectez-vous
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
