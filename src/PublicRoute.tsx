import React from "react"

import { Navigate, Outlet } from "react-router-dom"
import authServices from "./features/auth/services/auth.services"

export const PulicRoute = () => {
  const isAuthenticated = authServices.isLoggedIn()

  return isAuthenticated ? <Navigate to="/dashboard" replace></Navigate> : <Outlet />
}
