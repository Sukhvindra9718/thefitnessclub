import React, { useEffect, useState } from 'react'
import { login } from '../../actions/gymOwnersAction'
import {useDispatch,useSelector} from "react-redux"


const SignIn = ({ SetSignInVisible }) => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.auth)

  const handleSignInVisibility = () => {
    document.body.style.overflow = 'auto'
    SetSignInVisible((signInVisible) => !signInVisible)
  }

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }


  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("click")
    dispatch(login(formData));
  }

  useEffect(()=>{
    if(data.token){
      window.location.href = "/dashboard"
    }
  },[data.token])


  return (
    <div className="Auth_Modal">
      <div className="SignIn_Container Auth_Container">
        <div className="Auth_Logo">
          <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
        </div>
        <div onClick={handleSignInVisibility} className="AuthCloseButton">
          <img className="CloseImage" src="./close.svg" alt="" />
        </div>
        <form onSubmit={handleSignIn} className="SignIn_Form">
          <input
            className="SignIn_Email Auth_Input"
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="SignIn_Password Auth_Input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
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
