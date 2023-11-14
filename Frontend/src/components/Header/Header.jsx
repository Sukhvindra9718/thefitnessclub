import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [profileImageSrc, setProfileImageSrc] = useState('')
  const [profileOption, setProfileOption] = useState(false)
  const [user, setUser] = useState()
  const [image, setImage] = useState('')
  const navigate = useNavigate()

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

  const handleLogout = () => {
    Cookies.remove('user')
    Cookies.remove('token')
    window.location.reload(false)
  }

  useEffect(() => {
    const demo = Cookies.get('user')
    const imageUrl = Cookies.get('image')
    setUser(demo ? JSON.parse(demo) : null)
    setProfileImageSrc(imageUrl)
  }, [])


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
            <img
              className="profile-image"
              onClick={() => setProfileOption(!profileOption)}
              src={Cookies.get('image')}
              alt="profile"
            />
            {profileOption && (
              <div className="profile-option">
                <div
                  onClick={() =>
                    navigate('/profile', {
                      state: { profileImageSrc: profileImageSrc, user: user }
                    })
                  }>
                  <h2>Profile</h2>
                </div>
                <div onClick={() => navigate('/dashboard')}>
                  <h2>Dashboard</h2>
                </div>
                <div onClick={handleLogout}>
                  <h2>Logout</h2>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {signInVisible && (
        <SignIn
          SetSignInVisible={SetSignInVisible}
          setProfileImageSrc={setProfileImageSrc}
          setUser={setUser}
        />
      )}
      {signUpVisible && (
        <SignUp
          SetSignUpVisible={SetSignUpVisible}
          SetVerifyVisible={SetVerifyVisible}
          setEmail={setEmail}
          setName={setName}
          setPhoneNumber={setPhoneNumber}
          setImage={setImage}
        />
      )}
      {verifyVisible && <Verify SetVerifyVisible={SetVerifyVisible} email={email} name={name} phoneNumber={phoneNumber} image={image}/>}
    </>
  )
}

export default Header
