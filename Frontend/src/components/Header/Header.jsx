import React from 'react'
import { Link } from 'react-router-dom'

import "./Header.css"
function Header() {
  return (
    <div className='Header'>
      <div className="Header_Logo">
        <img className='Header_Logo_Image' src="./Logo.png" alt="Spotify Logo" />
      </div>
      <div className="Header_Navigation">
          <Link className='Link'>Home</Link>
          <Link className='Link'>About Us</Link>
          <Link className='Link'>Classes</Link>
          <Link className='Link'>Services</Link>
          <Link className='Link'>Our Team</Link>
          <Link className='Link'>Pages</Link>
          <Link className='Link'>Contact</Link>
      </div>
      <div className="Header_Auth">
        <button className="Header_Auth_Login Header_Auth_btn">SignIn</button>
        <button className="Header_Auth_Signup Header_Auth_btn">SignUp</button>
      </div>
    </div>
  )
}

export default Header
