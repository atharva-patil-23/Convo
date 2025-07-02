import { Route, Routes } from "react-router-dom"
import React from "react"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

function App() {
  return (
    <>
    <div className="bg-[url('./src/assets/bg-image.jpg')] bg-cover">
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />   
      </Routes>
    </div>
    </>
  )
}

export default App
