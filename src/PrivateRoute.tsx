import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import { Navigate, Route } from "react-router-dom"

export const PrivateRoute = ({ element, rest }: any) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.data !== null)

  return isAuthenticated ? <Route {...rest} element={element}></Route> : <Navigate to="/auth/login" replace></Navigate>
}
