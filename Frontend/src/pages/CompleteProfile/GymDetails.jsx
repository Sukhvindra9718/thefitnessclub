import React, { useState } from 'react'
import { TbCameraUp } from 'react-icons/tb'

const GymDetails = ({ handleSectionChange }) => {
  const [formData, setFormData] = useState({
    GymName: '',
    GymLogo: '',
    GymRegNum: '',
    GymAdd: ''
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

  // Next Page
  const NextPage = () => {
    handleSectionChange('PaymentDetails')
  }
  // Prev Page
  const PrevPage = () => {
    handleSectionChange('OwnerDetails')
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
          <span>Gym Details</span>
        </div>
        <div className="SectionForm">
          <div className="SectionForm_InputContainer">
            <input
              className="Auth_Input"
              type="text"
              name="GymName"
              placeholder="Gym Name"
              value={formData.name}
              onChange={(e) => handleInputChange(e)}
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
              name="GymRegNum"
              placeholder="GYM Registration Number"
              value={formData.AadharCard}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              className="Auth_Input"
              type="text"
              name="GymAdd"
              placeholder="GYM Address"
              value={formData.DOB}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
      </div>
      <div className="SectionForm_ButtonContainer">
        <button type="button" onClick={PrevPage}>
          Previous
        </button>
        <button type="button" onClick={handleGymDetailsData}>
          Save & Next
        </button>
      </div>
    </div>
  )
}

export default GymDetails
