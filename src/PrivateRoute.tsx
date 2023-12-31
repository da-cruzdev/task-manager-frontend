import React from "react"

import { Navigate, Outlet } from "react-router-dom"
import authServices from "./features/auth/services/auth.services"

export const PrivateRoute = () => {
  const isAuthenticated = authServices.isLoggedIn()

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace></Navigate>
}
