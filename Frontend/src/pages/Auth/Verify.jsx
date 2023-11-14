// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {verify} from "../../actions/gymOwnersAction"


const Verify = ({ SetVerifyVisible, email,name,phoneNumber,image }) => {
  const [otp, setOtp] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state) => state.verify)

  const handleVerifyVisibility = () => {
    document.body.style.overflow = 'auto'
    SetVerifyVisible((verifyVisible) => !verifyVisible)
  }

  const handleVerify = (e) => {
    e.preventDefault();
    dispatch(verify(email, otp))
  }
  const resendOtp = () => {}
  useEffect(() => {
    if (data.token) {
      navigate('/completeprofiledetails',{state:{id:data.token,name:name,email:email,phoneNumber:phoneNumber,image:image}})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.token])

  return (
    <div className="Auth_Modal">
      <div className="SignIn_Container Auth_Container">
        <div className="Auth_Logo">
          <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
        </div>
        <div onClick={handleVerifyVisibility} className="AuthCloseButton">
          <img className="CloseImage" src="./close.svg" alt="" />
        </div>
        <label style={{ marginTop: '1rem' }}>{email}</label>
        <form onSubmit={handleVerify} className="SignIn_Form" style={{ marginTop: '1rem' }}>
          <input
            className="SignIn_Email Auth_Input"
            type="text"
            name="otp"
            placeholder="Enter Otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="SignIn_Button_Container">
            <div className="SignIn_ForgotPass" onClick={resendOtp}>
              Resend Otp?
            </div>
            <button type="submit" className="SignIn_Submit">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Verify
