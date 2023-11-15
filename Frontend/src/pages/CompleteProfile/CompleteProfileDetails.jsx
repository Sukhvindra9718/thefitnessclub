import React, { useState } from 'react'
import GymDetails from './GymDetails'
import PaymentDetails from './PaymentDetails'
import OwnerDetails from './OwnerDetails'
import { useLocation } from 'react-router-dom'

function CompleteProfileDetails() {
  const location = useLocation()
  const { id, name, email, phoneNumber, image } = location.state
  const [activeSection, setActiveSection] = useState({
    OwnerDetails: true,
    GymDetails: false,
    PaymentDetails: false
  })

  const handleSectionChange = (section) => {
    setActiveSection({
      GymDetails: false,
      TrainerDetails: false,
      EquipmentDetails: false,
      PaymentDetails: false,
      [section]: true
    })
  }
  return (
    <div className="CompleteProfile">
      <div className="CompleteProfile_SideBar">
        <div className="CompleteProfile_SideBar_Logo">
          <img src="./Logo.png" alt="Logo" />
        </div>
        <div className="CompleteProfile_SideBarNavigation">
          <div
            className={`SidebarSection ${activeSection.OwnerDetails && 'active'}`}
            onClick={() => handleSectionChange('OwnerDetails')}>
            <span>Owner Details</span>
          </div>
          <div
            className={`SidebarSection ${activeSection.GymDetails && 'active'}`}
            onClick={() => handleSectionChange('GymDetails')}>
            <span>Gym Details</span>
          </div>
          <div
            className={`SidebarSection ${activeSection.PaymentDetails && 'active'}`}
            onClick={() => handleSectionChange('PaymentDetails')}>
            <span>Payment Details</span>
          </div>
        </div>
      </div>
      <div className="activeSection">
        {activeSection.OwnerDetails && (
          <OwnerDetails
            handleSectionChange={handleSectionChange}
            name={name}
            email={email}
            phoneNumber={phoneNumber}
            image={image}
          />
        )}
        {activeSection.GymDetails && <GymDetails handleSectionChange={handleSectionChange} />}
        {activeSection.PaymentDetails && (
          <PaymentDetails handleSectionChange={handleSectionChange} />
        )}
      </div>
    </div>
  )
}

export default CompleteProfileDetails
