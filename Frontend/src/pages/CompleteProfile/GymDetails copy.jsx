import React, { useState } from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IoMdAddCircleOutline } from 'react-icons/io'

const GymDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: '',
    AadharCard: '',
    DOB: '',
    Certificates: [
      {
        CertificateName: '',
        CertificateImage: '',
        CertificateNumber: '',
        CertificateDate: ''
      }
    ]
  })
  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')
  const [selectedFileName, setSelectedFileName] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(URL.createObjectURL(file))
      setSelectedFileName(file.name)
      setFormData({ ...formData, profileImage: file })
    } else {
      setSelectedFile('./DefaultUser.svg')
      setSelectedFileName('')
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target

    if (name.includes('Certificate')) {
      const updatedCertificates = [...formData.Certificates]
      updatedCertificates[index] = {
        ...updatedCertificates[index],
        [name]: value
      }

      setFormData({
        ...formData,
        Certificates: updatedCertificates
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const [selectedCertificateImage, setSelectedCertificateImage] = useState('./logo.png')
  const [selectedCertificateName, setSelectedCertificateName] = useState('')
  const handleCertificateFileChange = (e, index) => {
    const file = e.target.files[0]

    if (file) {
      setSelectedCertificateImage(URL.createObjectURL(file))
      setSelectedCertificateName(file.name)
      const updatedCertificates = [...formData.Certificates]
      updatedCertificates[index] = {
        ...updatedCertificates[index],
        CertificateImage: file
      }

      setFormData({
        ...formData,
        Certificates: updatedCertificates
      })
    } else {
      setSelectedCertificateName('')
      setSelectedCertificateImage('./logo.png')
    }
  }

  const addCertificate = () => {
    setFormData({
      ...formData,
      Certificates: [
        ...formData.Certificates,
        {
          CertificateName: '',
          CertificateImage: '',
          CertificateNumber: '',
          CertificateDate: ''
        }
      ]
    })
  }

  const deleteCertificate = (index) => {
    const updatedCertificates = [...formData.Certificates]
    updatedCertificates.splice(index, 1)

    setFormData({
      ...formData,
      Certificates: updatedCertificates
    })
  }

  const handleGymDetailsData = (e) => {
    e.preventDefault()
    // Add the dispatching logic here
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
              value={formData.name}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="Custom_ImageUploader_Preview_Container">
              <img src={selectedFile} alt="Preview" className="Custom_ImageUploader_Preview" />
            </div>
            <input
              className="Auth_Input"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              className="SignUp_Email Auth_Input"
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
            />
            <div className="Custom_ImageUploader">
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
                  accept=".jpg, .png,"
                  onChange={handleFileChange}
                  name="profileImage"
                />
              </div>
            </div>
            <input
              className="Auth_Input"
              type="text"
              name="AadharCard"
              placeholder="Aadhar Card Number"
              value={formData.AadharCard}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              className="Auth_Input"
              type="date"
              name="DOB"
              placeholder="Date of Birth"
              value={formData.DOB}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="SectionForm_CertificateContainer">
            <div className="SectionForm_CertificateHeader">
              <span>Certificates</span>
            </div>

            {formData.Certificates.map((certificate, index) => (
              <div key={index} className="SectionForm_Certificate">
                <input
                  className="Auth_Input"
                  type="text"
                  name="CertificateName"
                  placeholder="Certificate Name"
                  value={certificate.CertificateName}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <div className="Custom_ImageUploader_Preview_Container">
                  <img
                    src={selectedCertificateImage}
                    alt="Preview"
                    className="Custom_ImageUploader_Preview"
                  />
                </div>
                <input
                  className="Auth_Input"
                  type="text"
                  name="CertificateNumber"
                  placeholder="Certificate Number"
                  value={certificate.CertificateNumber}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <input
                  className="Auth_Input"
                  type="date"
                  name="CertificateDate"
                  placeholder="Certificate Date"
                  value={certificate.CertificateDate}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <div className="Custom_ImageUploader">
                  <input
                    className="Auth_Input"
                    type="text"
                    value={selectedCertificateName || ''}
                    disabled
                    placeholder={'Certificate Image'}
                  />
                  <input
                    className="FileUploader"
                    type="file"
                    accept=".jpg, .png"
                    onChange={(e) => handleCertificateFileChange(e, index)}
                    name="CertificateImage"
                  />
                </div>
                <abbr title="Delete Certificate">
                  <RiDeleteBin5Line
                    className="DeleteCertificate"
                    onClick={() => deleteCertificate(index)}
                  />
                </abbr>
              </div>
            ))}
            <div className="AddCertificate_Container">
              <div type="button" className="AddCertificate" onClick={addCertificate}>
                <IoMdAddCircleOutline className="AddCertificateBtn" />
                Certificate
              </div>
            </div>
          </div>
          <div className="SectionForm_ButtonContainer">
            <button type="button">Previous</button>
            <button type="button" onClick={handleGymDetailsData}>
              Save & Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GymDetails
