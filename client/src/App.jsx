import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Admin from './Pages/Admin'
import Login from './Pages/Login'
import Register from './Pages/Register'
import './App.scss'
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/*" element={<Layout />}></Route>
        </Routes>
      </Router>
  )
}

export default App
