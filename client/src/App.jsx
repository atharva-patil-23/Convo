import { Navigate, Route, Routes } from "react-router-dom"
import React, { useContext } from "react"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import {Toaster} from "react-hot-toast"
import { AuthContext } from "../context/Auth.context.jsx"

function App() {

  const { authUser } = useContext(AuthContext)
  return (
    <>
    <div className="bg-[url('/bg-image.jpg')] bg-cover">
      <Toaster />
      <Routes>
          <Route path="/" element={authUser? <HomePage /> :<Navigate to='/login' />} />
          <Route path="/login" element={!authUser ?<LoginPage /> : <Navigate to='/' />} />
          <Route path="/profile" element={authUser? <ProfilePage /> : <Navigate to='/login' />} />   
      </Routes>
    </div>
    </>
  )
}

export default App
