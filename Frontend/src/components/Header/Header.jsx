import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Header.css'
import SignIn from '../../pages/Auth/SignIn'
import SignUp from '../../pages/Auth/SignUp'
import Verify from '../../pages/Auth/Verify'
import Cookies from 'js-cookie'
import Loader from '../Loader'
import MyAccount from '../../pages/MyAccount'

function Header() {
  const [signInVisible, SetSignInVisible] = useState(false)
  const [signUpVisible, SetSignUpVisible] = useState(false)
  const [verifyVisible, SetVerifyVisible] = useState(false)
  const [profileVisible, setProfileVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [profileOption, setProfileOption] = useState(false)
  const [userId, setUserId] = useState()
  const [user, setUser] = useState()
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)
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

  const handleProfileVisibility = () => {
    // Disable scrolling
    document.body.style.overflow = 'hidden'
    setProfileVisible((profileVisible) => !profileVisible)
  }

  const handleLogout = () => {
    Cookies.remove('user')
    Cookies.remove('token')
    window.location.reload(false)
  }

  useEffect(() => {
    const id = Cookies.get('user')
    setUserId(id)
    const data = JSON.parse(localStorage.getItem('user'))
    setUser(data)
    setLoading(false)
  }, [])

  return loading ? (
    <Loader loading={loading} />
  ) : (
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
        {!userId ? (
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
              src={`data:image/jpeg;base64,${user?.profile_image}`}
              alt="profile"
            />
            {profileOption && (
              <div className="profile-option">
                <div onClick={handleProfileVisibility}>
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
      {signInVisible && <SignIn SetSignInVisible={SetSignInVisible} setUserId={setUserId} />}
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
      {verifyVisible && (
        <Verify
          SetVerifyVisible={SetVerifyVisible}
          email={email}
          name={name}
          phoneNumber={phoneNumber}
          image={image}
        />
      )}
      {profileVisible && (
        <MyAccount
          setProfileVisible={setProfileVisible}
          user={user}
        />
      )}
    </>
  )
}

export default Header
