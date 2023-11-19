import React, { useState } from 'react'
import { TbCameraUp } from 'react-icons/tb'

const MyAccount = ({ setProfileVisible, user }) => {
  const [editMode, setEditMode] = useState(false)
  // console.log(user)

  // Logic for Image Uploader
  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')
  const [previewImg, setPreviewImg] = useState(user.profile_image)
  const [logoPreviewImg, setLogoPreviewImg] = useState(user.gymlogo)
  const [logoFile, setLogoFile] = useState('./DefaultUser.svg')


  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(URL.createObjectURL(file))
    } else {
      setSelectedFile('./DefaultUser.svg')
    }
  }
  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(URL.createObjectURL(file))
    } else {
      setLogoFile('./DefaultUser.svg')
    }
  }
  const handleProfileVisibility = () => {
    document.body.style.overflow = 'auto'
    setProfileVisible((profileVisible) => !profileVisible)
  }

  return (
    <div className="Auth_Modal">
      <div className="Auth_Container MyAccount_Container">
        <div className="Auth_Logo">
          <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
        </div>
        <div onClick={handleProfileVisibility} className="AuthCloseButton">
          <img className="CloseImage" src="./close.svg" alt="" />
        </div>
        <div className="MyAccount_InputContainer">
          <input
            className="Auth_Input"
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            readOnly={true}
          />
          <div className="Custom_ImageUploader_Preview_Container_Profile">
            <div className='logo-img-container'>
             {editMode === true && <input
                className="FileUploader"
                type="file"
                accept=".jpg, .png,"
                onChange={handleFileChange}
                name="profileImage"
              />}
              {editMode === false && (
                <img
                  src={'data:image/jpeg;base64,' + previewImg}
                  alt="Preview"
                  className="Custom_ImageUploader_Preview"
                />
              )}
              {editMode === true && (
                <img src={selectedFile} alt="Preview" className="Custom_ImageUploader_Preview" />
              )}
              <span className='profile-img-text'>Profile Image</span>
              {editMode === true && <TbCameraUp className="UploadImageIcon" />}
            </div>
            <div className='profile-img-container'>
             {editMode === true && <input
                className="FileUploader"
                type="file"
                accept=".jpg, .png,"
                onChange={handleLogoChange}
                name="profileImage"
              />}
              {editMode === false && (
                <img
                  src={'data:image/jpeg;base64,' + logoPreviewImg}
                  alt="Preview"
                  className="Custom_ImageUploader_Preview"
                />
              )}
              {editMode === true && (
                <img src={logoFile} alt="Preview" className="Custom_ImageUploader_Preview" />
              )}
              <span className='profile-img-text'>Gym Logo</span>
              {editMode === true && <TbCameraUp className="UploadImageIcon" />}
            </div>
          </div>
          <input
            className="Auth_Input"
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            value={user.phonenumber}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="membership_duration"
            placeholder="Membership Duration"
            value={user.membership_duration}
            readOnly={true}
          />

          <input
            className="Auth_Input"
            type="text"
            name="dob"
            placeholder="DOB"
            value={new Date(user.dob).toLocaleString().split(',')[0]}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="membership_price"
            placeholder="Membership Price"
            value={user.membership_price}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="adhaarcardno"
            placeholder="Adhaar Card No"
            value={user.adhaarcardno}
            readOnly={true}
          />

          <input
            className="Auth_Input"
            type="text"
            name="membership_type"
            placeholder="Membership Type"
            value={user.membership_type}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="gymname"
            placeholder="Gym Name"
            value={user.gymname}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="gymaddress"
            placeholder="Gym Address"
            value={user.gymadd}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="prebookedate"
            placeholder="Prebooked Date"
            value={new Date(user.prebookeddate).toLocaleString().split(',')[0]}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="status"
            placeholder="Status"
            value={user.gymregnum}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  )
}

export default MyAccount
