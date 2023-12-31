import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import SignIn from '../../pages/Auth/SignIn'
import SignUp from '../../pages/Auth/SignUp'
import Verify from '../../pages/Auth/Verify'
import Cookies from 'js-cookie'
import MyAccount from '../../pages/MyAccount'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Header() {
  const [signInVisible, SetSignInVisible] = useState(false)
  const [signUpVisible, SetSignUpVisible] = useState(false)
  const [verifyVisible, SetVerifyVisible] = useState(false)
  const [profileVisible, setProfileVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [profileOption, setProfileOption] = useState(false)
  const [image, setImage] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [user,setUser] = useState({})
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
    localStorage.removeItem('user')
    window.location.reload(false)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setUser(user)
    if (toastVisible) {
      if (toastType === 'success') {
        toast.success(toastMessage, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error(toastMessage, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
    // eslint-disable-next-line
  }, [toastVisible])


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
        {!user?.id ? (
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
      {signInVisible && <SignIn SetSignInVisible={SetSignInVisible} setToastMessage={setToastMessage} setToastType={setToastType} setToastVisible={setToastVisible} setUser={setUser}/>}
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Header
