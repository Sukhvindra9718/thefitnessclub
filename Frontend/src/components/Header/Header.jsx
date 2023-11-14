import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Header.css'
import SignIn from '../../pages/Auth/SignIn'
import SignUp from '../../pages/Auth/SignUp'
import Verify from '../../pages/Auth/Verify'
function Header() {
  const [signInVisible, SetSignInVisible] = useState(false)
  const [signUpVisible, SetSignUpVisible] = useState(false)
  const [verifyVisible, SetVerifyVisible] = useState(false)
  const [email, setEmail] = useState('')

  const handleSignInVisibility = () => {
    // Disable scrolling
    document.body.style.overflow = 'hidden'
    SetSignInVisible((signInVisible) => !signInVisible)
  }

  const handleSignUpVisibility = () => {
    // Disable scrolling
    document.body.style.overflow = 'hidden'
    SetSignUpVisible((signUpVisible) => !signUpVisible)
  }
  return (
    <>
      <div className="Header">
        <div className="Header_Logo">
          <img className="Header_Logo_Image" src="./Logo.png" alt="Spotify Logo" />
        </div>
        <div className="Header_Navigation">
          <Link className="Link" to={'/'}>
            Home
          </Link>
          <Link className="Link">About Us</Link>
          <Link className="Link">Classes</Link>
          <Link className="Link">Services</Link>
          <Link className="Link">Our Team</Link>
          <Link className="Link">Pages</Link>
          <Link className="Link">Contact</Link>
        </div>
        <div className="Header_Auth">
          <button
            onClick={() => handleSignInVisibility()}
            className="Header_Auth_SignIn Header_Auth_btn">
            SignIn
          </button>
          <button
            onClick={() => handleSignUpVisibility()}
            className="Header_Auth_SignUp Header_Auth_btn">
            SignUp
          </button>
        </div>
      </div>
      {signInVisible && <SignIn SetSignInVisible={SetSignInVisible} />}
      {signUpVisible && (
        <SignUp
          SetSignUpVisible={SetSignUpVisible}
          SetVerifyVisible={SetVerifyVisible}
          setEmail={setEmail}
        />
      )}
      {verifyVisible && <Verify SetVerifyVisible={SetVerifyVisible} email={email} />}
    </>
  )
}

export default Header
