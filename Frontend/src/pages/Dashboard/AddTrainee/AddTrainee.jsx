import React, { useState } from 'react'
import '../../../Style/AddTrainer.css'
import { FaUser, FaUserGraduate } from 'react-icons/fa'
import { MdPayment, MdOutlineVerifiedUser } from 'react-icons/md'
import { CitySelect, CountrySelect, StateSelect } from '@davzon/react-country-state-city'
import '@davzon/react-country-state-city/dist/react-country-state-city.css'
import { TbCameraUp } from 'react-icons/tb'
import { GrSchedule } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'

function AddTrainee() {
  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')
  const [countryid, setCountryid] = useState(0)
  const [stateid, setstateid] = useState(0)
  const [otp, setOtp] = useState('')
  const [tab, setTab] = useState(1)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    AadharCard: '',
    DOB: '',
    Address: '',
    email: '',
    phoneNumber: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    bankname: '',
    salary: '',
    accountNumber: '',
    IFSCCode: '',
    gender: '',
    joiningDate: '',
    profileImage: '',
    group: '',
    plan: '',
    duration: 1,
    startdate: calculateEndDate(new Date(), 0)
  })
  const [enddate, setEndDate] = useState(calculateEndDate(new Date(), 1))

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(URL.createObjectURL(file))

      setFormData({
        ...formData,
        [e.target.name]: file
      })
    } else {
      setSelectedFile('./DefaultUser.svg')
    }
  }
  const handleVerify = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  function calculateEndDate(currentDate, months) {
    // Convert the input string to a Date object if it's not already in Date format
    if (!(currentDate instanceof Date)) {
      currentDate = new Date(currentDate) // Assuming input format is 'YYYY-MM-DD'
    }

    // Calculate the end date by adding the specified number of months
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + months,
      currentDate.getDate() + 1
    )

    // Format the end date as 'YYYY-MM-DD'
    const formattedEndDate = endDate.toISOString().split('T')[0]

    return formattedEndDate
  }
  const handlePlanChange = (e) => {
    const a = parseInt(e.target.value)
    setFormData({ ...formData, plan: parseInt(e.target.value) })
    setFormData({ ...formData, duration: parseInt(e.target.value) })
    setEndDate(() => calculateEndDate(new Date(), a))
  }
  return (
    <div className="addTrainer-page">
      <div className="wizard">
        <div className="wizard-inner">
          <div className="connecting-line2"></div>
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation">
              <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Step 1">
                <span className={`${tab !== 1 ? 'round-tab' : 'round-tab activeTab'}`}>
                  <FaUser size={30} fill="black" />
                </span>
              </a>
              <span>Personal Details</span>
            </li>
            <li role="presentation">
              <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Step 2">
                <span className={`${tab !== 2 ? 'round-tab' : 'round-tab activeTab'}`}>
                  <GrSchedule size={30} fill="black" />
                </span>
              </a>
              <span>Plan Details</span>
            </li>
            <li role="presentation">
              <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Step 3">
                <span className={`${tab !== 3 ? 'round-tab' : 'round-tab activeTab'}`}>
                  <MdPayment size={30} fill="black" />
                </span>
              </a>
              <span>Payment Details</span>
            </li>
            <li role="presentation">
              <a
                href="#complete"
                data-toggle="tab"
                aria-controls="complete"
                role="tab"
                title="Complete">
                <span className={`${tab !== 4 ? 'round-tab' : 'round-tab activeTab'}`}>
                  <MdOutlineVerifiedUser size={30} fill="black" />
                </span>
              </a>
              <span>Verification</span>
            </li>
          </ul>
        </div>
      </div>
      {tab === 1 && (
        <section>
          <div className="Section">
            <div className="SubSection">
              <div className="SectionHeader">
                <span>Personal Details</span>
              </div>
              <div className="SectionForm_AddTrainer">
                <div className="Custom_ImageUploader_Preview_Container_AddTrainer">
                  <input
                    className="FileUploader_AddTrainer"
                    type="file"
                    accept=".jpg, .png,"
                    name="profileImage"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <img src={selectedFile} alt="Preview" className="Custom_ImageUploader_Preview" />
                  <TbCameraUp className="FileUploaderIcon_AddTrainer" fill="white" size={25} />
                </div>
                <div className="SectionForm_InputContainer_AddTrainer">
                  <input
                    className="Auth_Input"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    className="Auth_Input"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange(e)}
                  />
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
                  <input
                    className="Auth_Input"
                    type="date"
                    name="DOB"
                    placeholder="Date of Birth"
                    aria-placeholder="Date of Birth"
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
                  <input
                    className="Auth_Input"
                    type="text"
                    name="Address"
                    placeholder="Address"
                    value={formData.Address}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    className="Auth_Input"
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <select
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="Auth_Input">
                    <option value="select">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <CountrySelect
                    onChange={(e) => {
                      setCountryid(e.id)
                      setFormData({
                        ...formData,
                        country: e.name
                      })
                    }}
                    placeHolder="Select Country"
                    inputClassName="Auth_Input"
                  />
                  <StateSelect
                    countryid={countryid}
                    onChange={(e) => {
                      setstateid(e.id)
                      setFormData({
                        ...formData,
                        state: e.name
                      })
                    }}
                    placeHolder="Select State"
                    inputClassName="Auth_Input"
                  />
                  <CitySelect
                    countryid={countryid}
                    stateid={stateid}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        city: e.name
                      })
                    }}
                    placeHolder="Select City"
                    inputClassName="Auth_Input"
                  />
                </div>
              </div>
              <div className="SectionForm_ButtonContainer_AddTrainer">
                <div></div>
                <button type="button" onClick={() => setTab(2)}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {tab === 2 && (
        <section>
          <div className="Section">
            <div className="SubSection">
              <div className="SectionHeader" style={{ marginLeft: '9rem', marginBottom: '1rem' }}>
                <span>Choose Plan</span>
              </div>
              <div className="SectionForm_AddTrainer" style={{ justifyContent: 'center' }}>
                <div className="SectionForm_InputContainer_AddTrainee2">
                  <div>
                    <label>Group</label>
                    <select
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      className="Auth_Input">
                      <option value={'solo'}>Solo</option>
                      <option value={'couple'}>Couple</option>
                    </select>
                  </div>
                  <div>
                    <label>Plan</label>
                    <select onChange={handlePlanChange} className="Auth_Input">
                      <option value={'1'}>Monthly</option>
                      <option value={'3'}>Quaterly</option>
                      <option value={'6'}>Half Yearly</option>
                      <option value={'12'}>Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label>Duration</label>
                    <input
                      className="Auth_Input"
                      type="text"
                      name="duration"
                      placeholder="Duration"
                      value={
                        formData.duration === 1
                          ? formData.duration + ' Month'
                          : formData.duration + ' Months'
                      }
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label>Start Date</label>
                    <input
                      className="Auth_Input"
                      type="text"
                      name="startdate"
                      placeholder="Start Date"
                      value={formData.startdate}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      className="SignUp_Email Auth_Input"
                      type="text"
                      name="enddate"
                      placeholder="End Date"
                      value={enddate}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="view-plan-container">
                  <div className="view-plan">
                    <div>
                      <label>Monthly</label>
                      <span>₹1,000.00</span>
                    </div>
                    <div>
                      <label>3 Months</label>
                      <span>₹2,500.00</span>
                    </div>
                    <div>
                      <label>6 Months</label>
                      <span>₹4,500.00</span>
                    </div>
                    <div>
                      <label>Yearly</label>
                      <span>₹7,000.00</span>
                    </div>
                  </div>
                  <div className="SectionForm_ButtonContainer_AddTrainer" style={{ width: '100%' }}>
                    <button type="button" onClick={() => setTab(1)}>
                      Previous
                    </button>
                    <button type="button" onClick={() => setTab(3)}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {tab === 3 && (
        <section>
          <div className="Section">
            <div className="SubSection">
              <div className="SectionHeader" style={{ marginLeft: '9rem', marginBottom: '2rem' }}>
                <span>Payment Details</span>
              </div>
              <div className="SectionForm_AddTrainer" style={{ justifyContent: 'center' }}>
                <div className="SectionForm_InputContainer_AddTrainer3">
                  <input
                    className="Auth_Input"
                    type="text"
                    name="bankname"
                    placeholder="Bank Name"
                    value={formData.bankname}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    className="Auth_Input"
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    className="Auth_Input"
                    type="text"
                    name="IFSCCode"
                    placeholder="IFSC Code"
                    value={formData.IFSCCode}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    className="SignUp_Email Auth_Input"
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <input
                    className="Auth_Input"
                    type="date"
                    name="joiningDate"
                    placeholder="Joining Date"
                    aria-placeholder="Joining Date"
                    value={formData.joiningDate}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                <div className="SectionForm_ButtonContainer_AddTrainer" style={{ width: '80%' }}>
                  <button type="button" onClick={() => setTab(2)}>
                    Previous
                  </button>
                  <button type="button" onClick={() => setTab(4)}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {tab === 4 && (
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
          }}>
          <div className="verify-modal">
            <label>{formData.email}</label>
            <div className="verifyContainer">
              <input
                className="Auth_Input"
                type="text"
                name="otp"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="button" className="verify-btn" onClick={handleVerify}>
                Verify
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default AddTrainee
