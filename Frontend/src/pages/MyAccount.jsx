import React, { useState } from 'react'
import { TbCameraUp } from 'react-icons/tb'

const MyAccount = ({ setProfileVisible, profileImageSrc, user }) => {
  console.log(user)
  const handleProfileVisibility = () => {
    document.body.style.overflow = 'auto'
    setProfileVisible((profileVisible) => !profileVisible)
  }
  // membership_price: null, membership_duration: null, membership_type: null, adhaarcardno:
  //         null, RecentCertificate: null, prebookedate: null, status: null
  // Logic for Image Uploader
  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(URL.createObjectURL(profileImageSrc))
    } else {
      setSelectedFile('./DefaultUser.svg')
    }
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
            contentEditable={false}
          />
          <div className="Custom_ImageUploader_Preview_Container">
            <input
              className="FileUploader"
              type="file"
              accept=".jpg, .png,"
              // onChange={handleFileChange}
              name="profileImage"
            />
            <img src={selectedFile} alt="Preview" className="Custom_ImageUploader_Preview" />
            <TbCameraUp className="UploadImageIcon" />
          </div>
          <input
            className="Auth_Input"
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            value={user.phoneNumber}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="role"
            placeholder="Role"
            value={user.role}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="createdat"
            placeholder="Created At"
            value={user.createdat}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="membership_price"
            placeholder="Membership Price"
            value={user.membership_price}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="membership_duration"
            placeholder="Membership Duration"
            value={user.membership_duration}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="membership_type"
            placeholder="Membership Type"
            value={user.membership_type}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="adhaarcardno"
            placeholder="Adhaar Card No"
            value={user.adhaarcardno}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="RecentCertificate"
            placeholder="Recent Certificate"
            value={user.RecentCertificate}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="prebookedate"
            placeholder="Prebooked Date"
            value={user.prebookedate}
            contentEditable={false}
          />
          <input
            className="Auth_Input"
            type="text"
            name="status"
            placeholder="Status"
            value={user.status}
            contentEditable={false}
          />
        </div>
      </div>
    </div>
  )
}

export default MyAccount
