import React, { useState } from 'react'

const SignUp = ({ SetSignUpVisible }) => {
  const handleSignUpVisibility = () => {
    // Enable scrolling
    document.body.style.overflow = 'auto'
    SetSignUpVisible((signUpVisible) => !signUpVisible)
  }

  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')
  const [selectedFileName, setSelectedFileName] = useState(null)
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(URL.createObjectURL(file))
      setSelectedFileName(file.name)
    } else {
      setSelectedFile(null)
      setSelectedFileName(null)
    }
  }
  return (
    <div className="Auth_Modal">
      <div className="SignUp_Container Auth_Container">
        <div className="Auth_Logo">
          <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
        </div>
        <div onClick={() => handleSignUpVisibility()} className="AuthCloseButton">
          <img className="CloseImage" src="./close.svg" alt="" />
        </div>
        <form action="" method="post" className="SignUp_Form">
          <div className="SignUp_Input_Container">
            <input className="Auth_Input" type="text" placeholder="Full Name" />
            <div className="Custom_ImageUploader_Preview_Container">
              <img src={selectedFile} alt="Preview" className="Custom_ImageUploader_Preview" />
            </div>
            <div className="Custom_ImageUploader">
              <input
                className="Auth_Input"
                type="text"
                value={selectedFileName}
                placeholder={'Profile Image'}
              />
              <input
                className="FileUploader"
                type="file"
                name="image"
                accept=".jpg, .png,"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <input className="Auth_Input" type="text" placeholder="Phone Number" />
            <input className="SignUp_Email Auth_Input" type="text" placeholder="Email" />
            <input className="SignUp_Password Auth_Input" type="password" placeholder="Password" />
            <input
              className="SignUp_ConfirmPassword Auth_Input"
              type="password"
              placeholder="Confirm Password"
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
