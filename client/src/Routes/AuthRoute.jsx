import React from 'react'
import { Route, Routes } from 'react-router'
import Login from '../pages/auth/Login'
import SuperLogin from '../pages/auth/SuperLogin'

function AuthRoute({setIsLogin}) {
  return (
    <Routes>
      <Route path="/" element={<Login setIsLogin={setIsLogin} />} />
  
      {/* <Route path="/club-control" element={<Login setIsLogin={setIsLogin} />} /> */}
      <Route path="/cash-control" element={<SuperLogin setIsLogin={setIsLogin} />} />


      {/* Add more routes for different authentication pages */}
    </Routes>
  )
}

export default AuthRoute