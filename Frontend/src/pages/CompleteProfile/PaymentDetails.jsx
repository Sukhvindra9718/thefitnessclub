import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const PaymentDetails = ({ handleSectionChange, formData,token }) => {
  const [membershipPrice, setMembershipPrice] = useState(19.99)
  const [membershipDuration, setMembershipDuration] = useState('Monthly')
  const [membershipType, setMembershipType] = useState('Light');
  const navigate = useNavigate();
  // Prev page
  const PrevPage = () => {
    handleSectionChange('GymDetails')
  }

  const handleGymDetailsData = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append('AadharCard',formData.AadharCard);
    newForm.append('DOB',formData.DOB); 
    newForm.append('GymName',formData.GymName);
    newForm.append('profile_image',formData.GymLogo);
    newForm.append('GymRegNum',formData.GymRegNum);
    newForm.append('GymAdd',formData.GymAdd);
    newForm.append('Address1',formData.Address1);
    newForm.append('Address2',formData.Address2);
    newForm.append('membershipDuration',membershipDuration);
    newForm.append('membershipPrice',membershipPrice);
    newForm.append('membershipType',membershipType);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
    }
    axios
      .put('http://192.168.0.107:3001/api/v1/complete/profile', newForm, config)
      .then((res) => {
        if(res.data.success){
          navigate('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="Section">
      <div className="SectionHeader">
        <span>Plans</span>
      </div>
      <div className="SectionForm">
        <div class="container">
          <div
            class="card light"
            onClick={() => {
              setMembershipPrice(19.99)
              setMembershipDuration('Monthly')
              setMembershipType('Light')
            }}>
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

          <div
            class="card pro"
            onClick={() => {
              setMembershipPrice(39.99)
              setMembershipDuration('Monthly')
              setMembershipType('Pro')
            }}>
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

          <div
            class="card advanced"
            onClick={() => {
              setMembershipPrice(59.99)
              setMembershipDuration('Monthly')
              setMembershipType('Advanced')
            }}>
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
            <h2>${membershipPrice}</h2>
            <p>{membershipDuration} Membership</p>
            <p>{membershipType} Plan</p>
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
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
