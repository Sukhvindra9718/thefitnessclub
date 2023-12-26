import React, { useState } from 'react'
import '../../../Style/AddTrainer.css'
import { FaUser} from 'react-icons/fa'
import { MdPayment, MdOutlineVerifiedUser } from 'react-icons/md'
import { CitySelect, CountrySelect, StateSelect } from '@davzon/react-country-state-city'
import '@davzon/react-country-state-city/dist/react-country-state-city.css'
import { TbCameraUp } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from '../../../components/Loader'
function AddTrainer() {
  const [loading, setLoading] = useState(false)
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
    status: '',
    joiningDate: '',
    profileImage: ''
  })

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
    navigate('/dashboard', { state: { trainer: 8 } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if(formData.firstname === '' || formData.lastname === '' || formData.AadharCard === '' || formData.DOB === '' || formData.Address === '' || formData.email === '' || formData.phoneNumber === '' || formData.pincode === '' || formData.city === '' || formData.state === '' || formData.country === '' || formData.bankname === '' || formData.salary === '' || formData.accountNumber === '' || formData.IFSCCode === '' || formData.status === '' || formData.joiningDate === '' || formData.profileImage === ''){ 
      alert('Please fill all the fields')
      setLoading(false)
      return
    }

    const newFormData = new FormData();
    newFormData.append('firstname', formData.firstname);
    newFormData.append('lastname', formData.lastname);
    newFormData.append('AadharCard', formData.AadharCard);
    newFormData.append('DOB', formData.DOB);
    newFormData.append('Address', formData.Address);
    newFormData.append('email', formData.email);
    newFormData.append('phoneNumber', formData.phoneNumber);
    newFormData.append('pincode', formData.pincode);
    newFormData.append('city', formData.city);
    newFormData.append('state', formData.state);
    newFormData.append('country', formData.country);
    newFormData.append('bankname', formData.bankname);
    newFormData.append('salary', formData.salary);
    newFormData.append('accountNumber', formData.accountNumber);
    newFormData.append('IFSCCode', formData.IFSCCode);
    newFormData.append('status', formData.status);
    newFormData.append('joiningDate', formData.joiningDate);
    newFormData.append('profile_image', formData.profileImage);

    const token = Cookies.get('token')
    const config = {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
    }
    axios.post('http://localhost:3001/api/v1/trainer/register', newFormData, config).then((res) => {
      if(res.data.success){
        setLoading(false)
        setTab(3)
      }
    })
  }

  
  return (
    <div className="addTrainer-page">
      <div className="wizard">
        <div className="wizard-inner">
          <div className="connecting-line"></div>
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
              <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Step 3">
                <span className={`${tab !== 2 ? 'round-tab' : 'round-tab activeTab'}`}>
                  <MdPayment size={30} fill="black" />
                </span>
              </a>
              <span>Account Details</span>
            </li>
            <li role="presentation">
              <a
                href="#complete"
                data-toggle="tab"
                aria-controls="complete"
                role="tab"
                title="Complete">
                <span className={`${tab !== 3 ? 'round-tab' : 'round-tab activeTab'}`}>
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
              <div className="SectionHeader"  style={{paddingLeft:"5rem"}}>
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
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="Auth_Input">
                    <option value="select">Select Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
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
              <div className="SectionForm_ButtonContainer_AddTrainer" style={{width:"97%",justifyContent:"flex-end"}}>
                <button type="button" onClick={() => setTab(2)}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
     
      {tab === 2 && (
        loading ? (<Loader loading={loading}/>):<section>
          <div className="Section">
            <div className="SubSection" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="SectionHeader" style={{marginBottom: '2rem',width:"80%" }}>
                <span>Account Details</span>
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
                  <button type="button" onClick={() => setTab(1)}>
                    Previous
                  </button>
                  <button type="button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {tab === 3 && (
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
          }}>
          <div className="verify-modal">
            <label>Email : {formData.email}</label>
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

export default AddTrainer
