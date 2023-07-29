"use client"
import React from "react"
import { Button, Card, Spinner } from "flowbite-react"
import { useForm } from "react-hook-form"
import { EmailInput } from "../../components/form-inputs/EmailInput"
import { PasswordInput } from "../../components/form-inputs/PasswordInput"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../../app/hooks"
import { AppDispatch, RootState } from "../../../../app/store"
import { SignData } from "../../interfaces/signData.interfaces"
import { signinUser } from "./signin-slice"
import logo from "../logo.svg"
import { Link, useNavigate } from "react-router-dom"
import authServices from "../../services/auth.services"

export const Signin = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const loading = useSelector((state: RootState) => state.signin.loading)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm()

  const navigate = useNavigate()
  const isUserLoggedIn = authServices.isLoggedIn()

  const formSubmit = async (data: SignData) => {
    dispatch(signinUser(data))
      .unwrap()
      .then((data) => {
        console.log(data)
        reset()
        if (isUserLoggedIn) {
          navigate("/dashboard")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <Card className="container max-w-md mx-auto">
          <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
            <p>Signin</p>
          </h5>
          <img className="logo mx-auto" src={logo} alt="" />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(formSubmit)}>
            <EmailInput register={register} errors={formErrors} />
            <PasswordInput register={register} errors={formErrors} />

            <Button className="mt-5" type="submit">
              {loading ? <Spinner></Spinner> : "Submit"}
            </Button>
          </form>
          <Link to="/" className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
            <p>Vous n'avez pas de compte ? Inscrivez-vous ici</p>
          </Link>
        </Card>
      </div>
    </div>
  )
}
