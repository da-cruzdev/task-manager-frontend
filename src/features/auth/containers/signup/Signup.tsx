"use client"
import React from "react"
import { Button, Card, Spinner } from "flowbite-react"
import { useForm } from "react-hook-form"
import { EmailInput } from "../../components/form-inputs/EmailInput"
import { PasswordInput } from "../../components/form-inputs/PasswordInput"
import { UsernameInput } from "../../components/form-inputs/UsernameInput"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../../../app/hooks"
import { AppDispatch, RootState } from "../../../../app/store"
import { signupUser } from "./signup-slice"
import { SignData } from "../../interfaces/signData.interfaces"
import logo from "../logo.svg"
import { Link, useNavigate } from "react-router-dom"
import authServices from "../../services/auth.services"

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
  const isUserLoggedIn = authServices.isLoggedIn()

  const formSubmit = async (data: SignData) => {
    dispatch(signupUser(data))
      .unwrap()
      .then((data) => {
        console.log(data)
        if (isUserLoggedIn) {
          navigate("/dashboard")
        }
        reset()
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
            <p>Signup</p>
          </h5>
          <img className="logo mx-auto" src={logo} alt="" />
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(formSubmit)}>
            <UsernameInput register={register} errors={formErrors} />
            <EmailInput register={register} errors={formErrors} />
            <PasswordInput register={register} errors={formErrors} />

            <Button className="mt-5" type="submit">
              {loading ? <Spinner></Spinner> : "Submit"}
            </Button>
          </form>

          <Link to="auth/login" className="text-sm font-bold tracking-tight text-gray-900 dark:text-white mx-auto">
            <p>Vous avez déja un compte ? Connectez-vous</p>
          </Link>
        </Card>
      </div>
    </div>
  )
}
