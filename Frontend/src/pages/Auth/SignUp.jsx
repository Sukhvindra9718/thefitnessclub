import React, { useEffect, useState } from 'react'
import { register } from '../../actions/gymOwnersAction'
import { useDispatch, useSelector } from 'react-redux'
import { TbCameraUp } from 'react-icons/tb'

const SignUp = ({ SetSignUpVisible, SetVerifyVisible, setEmail }) => {
  const dispatch = useDispatch()
  const { registerStatus } = useSelector((state) => state.register)

  // Logic for Show/Hide this Comp.
  const handleSignUpVisibility = () => {
    document.body.style.overflow = 'auto'
    SetSignUpVisible((signUpVisible) => !signUpVisible)
  }

  // Logic for State Management of singUp form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  // Logic for Sign Up Form Submission

  const handleSignUp = (e) => {
    const { name, email, password, confirmPassword, phoneNumber, profileImage } = formData
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password and Confirm Password are not same')
      return
    }
    const SignUpData = new FormData()
    SignUpData.append('name', name)
    SignUpData.append('email', email)
    SignUpData.append('phoneNumber', phoneNumber)
    SignUpData.append('profile_image', profileImage)
    SignUpData.append('password', password)
    dispatch(register(SignUpData))
  }

  // Logic for Image Uploader
  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(URL.createObjectURL(file))
      setFormData({ ...formData, profileImage: file })
    } else {
      setSelectedFile('./DefaultUser.svg')
    }
  }

  useEffect(() => {
    if (registerStatus) {
      SetVerifyVisible((verifyVisible) => !verifyVisible)
      SetSignUpVisible((signUpVisible) => !signUpVisible)
      setEmail(formData.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerStatus])
  return (
    <div className="Auth_Modal">
      <div className="SignUp_Container Auth_Container">
        <div className="Auth_Logo">
          <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
        </div>
        <div onClick={handleSignUpVisibility} className="AuthCloseButton">
          <img className="CloseImage" src="./close.svg" alt="" />
        </div>
        <form onSubmit={handleSignUp} className="SignUp_Form">
          <div className="SignUp_Input_Container">
            <input
              className="Auth_Input"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <div className="Custom_ImageUploader_Preview_Container">
              <input
                className="FileUploader"
                type="file"
                accept=".jpg, .png,"
                onChange={handleFileChange}
                name="profileImage"
              />
              <img src={selectedFile} alt="Preview" className="Custom_ImageUploader_Preview" />
              <TbCameraUp className="UploadImageIcon" />
            </div>
            <input
              className="Auth_Input"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <input
              className="SignUp_Email Auth_Input"
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              className="SignUp_Password Auth_Input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              className="SignUp_ConfirmPassword Auth_Input"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="SignIn_Button_Container">
            <a className="SignIn_ForgotPass" href="/">
              Already have an account?
            </a>
            <button type="submit" className="SignIn_Submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
