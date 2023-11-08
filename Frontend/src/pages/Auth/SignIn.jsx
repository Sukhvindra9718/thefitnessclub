import React from 'react'

const SignIn = ({ SetSignInVisible }) => {
  const handleSignInVisibility = () => {
    // Enable scrolling
    document.body.style.overflow = 'auto'
    SetSignInVisible((signInVisible) => !signInVisible)
  }
  return (
    <div className="Auth_Modal">
      <div className="SignIn_Container Auth_Container">
        <div className="Auth_Logo">
          <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
        </div>
        <div onClick={() => handleSignInVisibility()} className="AuthCloseButton">
          <img className="CloseImage" src="./close.svg" alt="" />
        </div>
        <form action="" method="post" className="SignIn_Form">
          <input className="SignIn_Email Auth_Input" type="text" placeholder="Email" />
          <input className="SignIn_Password Auth_Input" type="password" placeholder="Password" />
          <div className="SignIn_Button_Container">
            <a className="SignIn_ForgotPass" href="/">
              Forgot Password?
            </a>
            <button type="submit" className="SignIn_Submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
