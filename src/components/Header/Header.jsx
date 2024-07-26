import React from 'react'
import './Header.css'


function Header({text, count}) {
  return (
    <div className="header-container">
      <div className="box">
        {text}
      </div>
      <div className="box">
        {count}
      </div>
    </div>
  )
}

export default Header