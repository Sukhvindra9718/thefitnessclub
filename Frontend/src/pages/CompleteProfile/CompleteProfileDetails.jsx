import React, { useState } from 'react'
import GymDetails from './GymDetails'
import PaymentDetails from './PaymentDetails'
import OwnerDetails from './OwnerDetails'
import { useLocation } from 'react-router-dom'

function CompleteProfileDetails() {
  const location = useLocation();
  const {id,name,email,phoneNumber,image} = location.state;
  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')
  const [formData, setFormData] = useState({
    AadharCard: '',
    DOB: '',
    GymName: '',
    GymLogo: '',
    GymRegNum: '',
    GymAdd: '',
    Address1:'',
    Address2:'',
  })
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
        {activeSection.OwnerDetails && <OwnerDetails handleSectionChange={handleSectionChange} name={name} email={email} phoneNumber={phoneNumber} image={image} formData={formData} setFormData={setFormData}/>}
        {activeSection.GymDetails && <GymDetails handleSectionChange={handleSectionChange} formData={formData} setFormData={setFormData} selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>}
        {activeSection.PaymentDetails && (
          <PaymentDetails handleSectionChange={handleSectionChange} token={id} formData={formData}/>
        )}
      </div>
    </div>
  )
}

export default CompleteProfileDetails
