import React, { useState } from 'react'
import { TbCameraUp } from 'react-icons/tb'

const OwnerDetails = ({ handleSectionChange,name,email,phoneNumber,image}) => {
  const [formData, setFormData] = useState({
    profileImage: '',
    AadharCard: '',
    DOB: ''
  })
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  //   Next Page
  const NextPage = () => {
    handleSectionChange('GymDetails')
  }

  const handleGymDetailsData = (e) => {
    e.preventDefault()

    // Add the dispatching logic here

    // Move to the next page
    NextPage()
  }
  return (
    <div className="Section">
      <div className="SubSection">
        <div className="SectionHeader">
          <span>Owner Details</span>
        </div>
        <div className="SectionForm">
          <div className="SectionForm_InputContainer">
            <input
              className="Auth_Input"
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              disabled="true"
            />
            <div className="Custom_ImageUploader_Preview_Container">
              <input
                className="FileUploader"
                type="file"
                accept=".jpg, .png,"
                // onChange={handleFileChange}
                name="profileImage"
                disabled="true"
              />
              <img src={image} alt="Preview" className="Custom_ImageUploader_Preview" />
              {/* <TbCameraUp className="UploadImageIcon" /> */}
            </div>
            <input
              className="Auth_Input"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              disabled="true"
            />
            <input
              className="SignUp_Email Auth_Input"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              disabled="true"
            />
            <input
              className="Auth_Input"
              type="date"
              name="DOB"
              placeholder="Date of Birth"
              aria-placeholder='Date of Birth'
              value={formData.DOB}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              className="Auth_Input"
              type="text"
              name="AadharCard"
              placeholder="Aadhar Card Number"
              value={formData.AadharCard}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="SectionForm_ButtonContainer">
            <div></div>
            <button type="button" onClick={handleGymDetailsData}>
              Save & Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerDetails
