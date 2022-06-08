import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import Layout from './Layout'
import Admin from './Pages/Admin'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Password from './Pages/Password'
import Monitoring from './Pages/Monitoring'
import './App.scss'
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin/*" element={<Admin />}></Route>
          <Route path="/*" element={<Layout />}></Route>
          <Route path="/password" element={<Password />} />
          <Route path="/monitoring" element={<Monitoring />} />
        </Routes>
      </Router>
  )
}

export default App
