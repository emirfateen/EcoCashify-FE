import React from "react"
import { Outlet, ScrollRestoration } from "react-router-dom"

function App() {
  return (
    <>
      <ScrollRestoration />
      <NavBar />
      <Outlet />
    </>
  )
}

export default App
