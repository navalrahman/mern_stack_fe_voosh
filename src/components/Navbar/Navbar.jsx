import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';


function Navbar() {
    const navigate = useNavigate()

  const handleClick = () => {
    navigate('/signin')
  }

  const token = localStorage.getItem('token')
  const name = localStorage.getItem('name')

  const handleSignupClick = () => {
   navigate('/signup')
  }

  const handleLoginClick = () => {
   navigate('/')
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className='navbar-main-div' >
        <div className='navbar-main-div-div'>
            {/* <button style={{ transform: 'scale(0.8)' }} onClick={handleMenuClick}>Menu</button> */}
            {
              token ? 
              <Button style={{ transform: 'scale(0.8)' }} onClick={handleLogout}>logout</Button>
              :
              <div>
                <Button style={{ transform: 'scale(0.8)' }} onClick={handleLoginClick}>login</Button>
                <Button style={{ transform: 'scale(0.8)' }} onClick={handleSignupClick}>Sign up</Button>
              </div>
            }
            
        </div>
    </div>
  )
}

export default Navbar