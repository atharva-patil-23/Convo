import { Navigate, Route, Routes } from "react-router-dom"
import React, { useContext } from "react"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import {Toaster} from "react-hot-toast"
import { AuthContext } from "../context/AuthContext.js"

function App() {

  const { authUser, isCheckingAuth } = useContext(AuthContext)

  if (isCheckingAuth) {
    return (
      <div className="bg-bg min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" aria-label="Loading" />
      </div>
    )
  }

  return (
    <div className="bg-bg min-h-screen text-text">
      <Toaster
        toastOptions={{
          style: {
            background: "var(--surface-1)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "13px",
            fontFamily: "Geist, system-ui, sans-serif",
          },
        }}
      />
      <Routes>
        <Route path="/" element={authUser? <HomePage /> :<Navigate to='/login' />} />
        <Route path="/login" element={!authUser ?<LoginPage /> : <Navigate to='/' />} />
        <Route path="/profile" element={authUser? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path="*" element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default App
