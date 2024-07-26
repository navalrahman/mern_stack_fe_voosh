import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Dashboard from './components/Dashboard/Dashboard'

function App() {

  const token = localStorage.getItem('token')


  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={ !token ? <Login/> : <Navigate to={'/dashboard'}/>}/>
        <Route path='/signup' element={!token ? <Signup/> : <Navigate to={'/dashboard'}/>} />
        <Route path='/dashboard' element={token ? <Dashboard/>:<Navigate to={'/'}/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
