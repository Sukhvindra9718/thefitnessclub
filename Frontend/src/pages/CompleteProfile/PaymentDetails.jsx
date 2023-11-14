import React, { useState } from 'react'
import { TbCameraUp } from 'react-icons/tb'

const PaymentDetails = ({ handleSectionChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
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
    handleSectionChange('OwnerDetails')
  }

  // Prev page
  const PrevPage = () => {
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
      <div className="SectionHeader">
        <span>Plans</span>
      </div>
      <div className="SectionForm">
        <div class="container">
          <div class="card light">
            <h2>Light Plan</h2>
            <p class="price">$19.99</p>
            <p class="duration">Per Month</p>
            <ul>
              <li>Access to basic gym facilities</li>
              <li>Personalized workout plans</li>
              <li>Weekly fitness classes</li>
              <li>24/7 customer support</li>
            </ul>
          </div>

          <div class="card pro">
            <h2>Pro Plan</h2>
            <p class="price">$39.99</p>
            <p class="duration">Per Month</p>
            <ul>
              <li>Full access to all gym facilities</li>
              <li>Personal trainer sessions</li>
              <li>Unlimited fitness classes</li>
              <li>Nutrition consultation</li>
            </ul>
          </div>

          <div class="card advanced">
            <h2>Advanced Plan</h2>
            <p class="price">$59.99</p>
            <p class="duration">Per Month</p>
            <ul>
              <li>Premium facilities and equipment</li>
              <li>Unlimited personal trainer sessions</li>
              <li>Exclusive access to VIP events</li>
              <li>Customized meal plans</li>
            </ul>
          </div>
        </div>
        <div class="pricing-container">
          <div class="price-section">
            <h2>$29.99</h2>
            <p>Monthly Membership</p>
          </div>

          <div class="payment-section">
            <button class="payment-button">Pay Now</button>
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
    </div>
  )
}

export default PaymentDetails
