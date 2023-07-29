"use client"
import React from "react"

import "./App.css"
import { Signup } from "./features/auth/containers/signup/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from "./features/auth/containers/signin/Signin"
import Dashboard from "./features/clients/containers/dashboard/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/auth/login" element={<Signin />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
