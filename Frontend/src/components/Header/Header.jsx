import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import './Header.css'
import SignIn from '../../pages/Auth/SignIn'
import SignUp from '../../pages/Auth/SignUp'
import Verify from '../../pages/Auth/Verify'
import Cookies from 'js-cookie'


function Header() {
  const [signInVisible, SetSignInVisible] = useState(false)
  const [signUpVisible, SetSignUpVisible] = useState(false)
  const [verifyVisible, SetVerifyVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [profileImageSrc, setProfileImageSrc] = useState('')
  const navigate = useNavigate();
  const user = Cookies.get('user');


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

  useEffect(() => {
    console.log(user.id)
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(
          `http://192.168.244.79:3001/api/v1/user/${14}/profile-image`
        )
        if (response.ok) {
          const blob = await response.blob()
          const imageUrl = URL.createObjectURL(blob)
          setProfileImageSrc(imageUrl)
        } else {
          console.error('Failed to fetch profile image.')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    return () => {
      fetchProfileImage()
    }
  }, [user.id])


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
        {!user ? (
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
        ) : (
          <div className="profile-circle">
            <img className="profile-image" src={profileImageSrc} alt="profile" onClick={()=> navigate('/profile',{state:{profileImageSrc:profileImageSrc,user:user}})}/>
          </div>
        )}
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
