import React, { useState } from 'react'
import '../../../Style/AddTrainer.css'
import { FaUser } from 'react-icons/fa'
import { MdPayment, MdOutlineVerifiedUser } from 'react-icons/md'
import { CitySelect, CountrySelect, StateSelect } from '@davzon/react-country-state-city'
import '@davzon/react-country-state-city/dist/react-country-state-city.css'
import { TbCameraUp } from 'react-icons/tb'
import { GrSchedule } from "react-icons/gr";
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader'
import Cookies from 'js-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddTrainee() {
  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')
  const [countryid, setCountryid] = useState(0)
  const [stateid, setstateid] = useState(0)
  const [otp, setOtp] = useState('')
  const [tab, setTab] = useState(1)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
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
    status: 'active',
    extentMembership: 0,
    discount: 0,
    receiptNumber: `${Math.floor(Math.random() * 10000)+ '-'+calculateEndDate(new Date(), 0)+'-'+Math.floor(Math.random() * 10000)}`,
    gender: '',
    profileImage: '',
    group: 'solo',
    plan:'1',
    planStartDate: calculateEndDate(new Date(), 0),
  })
  const [planEndDate, setPlanEndDate] = useState(calculateEndDate(new Date(), 1))
  const [plan, setPlan] = useState('Monthly')
  const [duration, setDuration] = useState(1)
  const [planPrice, setPlanPrice] = useState(1000)
  const [totalAmount, setTotalAmount] = useState(1000)
  const [amountPaid, setAmountPaid] = useState(0)
  const [offers, setOffers] = useState(100)
  const [modeOfPayment, setModeOfPayment] = useState('')

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
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }
    const { email } = formData;
    axios.post('http://localhost:3001/api/v1/trainee/verify', { email, otp }, config).then((res) => {
      if (res.data.success) {
        setLoading(false)
        toast.success('Email Verified', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate('/dashboard', { state: { trainee: 9 } })
        }, 2000)
      } else {
        setLoading(false)
      }
    }).catch((error) => {
      if (error.isAxiosError && error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      } else {
        toast.error('An unexpected error occurred. Please try again', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      }
    })
  }

  function calculateEndDate(currentDate, months) {
    // Convert the input string to a Date object if it's not already in Date format
    if (!(currentDate instanceof Date)) {
      currentDate = new Date(currentDate) // Assuming input format is 'YYYY-MM-DD'
    }

    // Calculate the end date by adding the specified number of months
    const planEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + months,
      currentDate.getDate() + 1
    )

    // Format the end date as 'YYYY-MM-DD'
    const formattedEndDate = planEndDate.toISOString().split('T')[0]

    return formattedEndDate
  }
  const handlePlanChange = (e) => {
    const a = parseInt(e.target.value)
    const planInText = a === 1 ? 'Monthly' : a === 3 ? 'Quarterly' : a === 6 ? 'Half Yearly' : 'Yearly'
    setPlan(planInText)
    setFormData({ ...formData, plan: e.target.value})
    setDuration(a)
    setPlanEndDate(() => calculateEndDate(new Date(), a))

    if (a === 1) {
      setPlanPrice(1000)
      setTotalAmount(1000 + ((1000 * 0.18) - offers))
    } else if (a === 3) {
      setPlanPrice(2500)
      setTotalAmount(2500 + ((2500 * 0.18) - offers))
    } else if (a === 6) {
      setPlanPrice(4500)
      setTotalAmount(4500 + ((4500 * 0.18) - offers))
    } else if (a === 12) {
      setPlanPrice(7000)
      setTotalAmount(7000 + ((7000 * 0.18) - offers))
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (formData.firstname === '' ||
      formData.lastname === '' ||
      formData.AadharCard === '' ||
      formData.DOB === '' ||
      formData.Address === '' ||
      formData.email === '' ||
      formData.phoneNumber === '' ||
      formData.pincode === '' ||
      formData.city === '' ||
      formData.state === '' ||
      formData.country === '' ||
      formData.status === '' ||
      formData.joiningDate === '' ||
      formData.profileImage === '' ||
      formData.modeOfPayment === '' ||
      formData.gender === '' ||
      formData.group === '' ||
      formData.planStartDate === '' ||
      planEndDate === '' ||
      planPrice === '' ||
      totalAmount === '' ||
      amountPaid === '' ||
      modeOfPayment === '' ||
      plan === '' ||
      duration === '') {

      toast.info('Please fill all the fields', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false)
      // return
    }

    const newFormData = new FormData();
    newFormData.append('firstname', formData.firstname)
    newFormData.append('lastname', formData.lastname)
    newFormData.append('AadharCard', formData.AadharCard)
    newFormData.append('DOB', formData.DOB)
    newFormData.append('Address', formData.Address)
    newFormData.append('email', formData.email)
    newFormData.append('phoneNumber', formData.phoneNumber)
    newFormData.append('pincode', formData.pincode)
    newFormData.append('city', formData.city)
    newFormData.append('state', formData.state)
    newFormData.append('country', formData.country)
    newFormData.append('status', formData.status)
    newFormData.append('extentMembership', formData.extentMembership)
    newFormData.append('discount', formData.discount)
    newFormData.append('receiptNumber', formData.receiptNumber)
    newFormData.append('gender', formData.gender)
    newFormData.append('joiningDate', formData.planStartDate)
    newFormData.append('group', formData.group)
    newFormData.append('planStartDate', formData.planStartDate)
    newFormData.append('planEndDate', planEndDate)
    newFormData.append('plan', plan)
    newFormData.append('duration', duration)
    newFormData.append('planPrice', planPrice)
    newFormData.append('totalAmount', totalAmount)
    newFormData.append('amountPaid', amountPaid)
    newFormData.append('balanceAmount', totalAmount - amountPaid)
    newFormData.append('modeOfPayment', modeOfPayment)
    newFormData.append('profile_image', formData.profileImage)

    const token = Cookies.get('token')
    const config = {
      headers: { 'Content-Type': 'Multipart/Form-Data', Authorization: `Bearer ${token}` }
    }

    axios.post('http://localhost:3001/api/v1/trainee/register', newFormData, config).then((res) => {
      if (res.data.success) {
        toast.success('Trainee Added Successfully', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
        setTab(4)
      } else {
        setLoading(false)
      }
    }).catch((error) => {
      if (error.isAxiosError && error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      } else {
        toast.error('An unexpected error occurred. Please try again.', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false)
      }
    })
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
              <div className="SectionHeader" style={{ paddingLeft: "5rem" }}>
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
              <div className="SectionForm_ButtonContainer_AddTrainer" style={{ width: "97%", justifyContent: "flex-end" }}>
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
            <div className="SubSection" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="SectionHeader" style={{ marginBottom: '1rem', width: "83%" }}>
                <span>Choose Plan</span>
              </div>
              <div className="SectionForm_AddTrainer" style={{ justifyContent: 'center' }}>
                <div className="SectionForm_InputContainer_AddTrainee2">
                  <div>
                    <label>Group</label>
                    <select
                      onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                      className="Auth_Input"
                      name='group'
                      value={formData.group}>
                      <option value={'solo'}>Solo</option>
                      <option value={'couple'}>Couple</option>
                    </select>
                  </div>
                  <div>
                    <label>Plan</label>
                    <select onChange={handlePlanChange} className="Auth_Input" value={formData.plan} name="plan">
                      <option value={'1'}>Monthly</option>
                      <option value={'3'}>Quarterly</option>
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
                        duration === 1
                          ? duration + ' Month'
                          : duration + ' Months'
                      }
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label>Start Date</label>
                    <input
                      className="Auth_Input"
                      type="text"
                      name="planStartDate"
                      placeholder="Start Date"
                      value={formData.planStartDate}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      className="SignUp_Email Auth_Input"
                      type="text"
                      name="planEndDate"
                      placeholder="End Date"
                      value={planEndDate}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label>Status</label>
                    <select
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="Auth_Input"
                      name='status'
                      value={formData.status}>
                      <option value={'active'}>Active</option>
                      <option value={'pending'}>Pending</option>
                      <option value={'inactive'}>InActive</option>
                    </select>
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
        loading ? (<Loader loading={loading} />) : <section>
          <div className="Section">
            <div className="SubSection" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="SectionHeader" style={{ marginBottom: '2rem', width: "90%" }}>
                <span>Payment Details</span>
              </div>
              <div className="SectionForm_AddTrainee" style={{ justifyContent: 'center' }}>
                <div className='PaymentSection-left'>
                  <div className="SectionForm_PlanSelected_Container">
                    <div className="SectionForm_PlanSelected">
                      <div>
                        <label>{plan}</label>
                      </div>
                      <div>
                        <span>{duration} {duration === 1 ? ' Month' : ' Months'}</span>
                      </div>
                      <div>
                        <span>{formData.planStartDate} - <span>{planEndDate} (+{formData.extentMembership} days)</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="PaymentSection_InputContainer_AddTrainee">
                    <input
                      className="Auth_Input"
                      type="text"
                      name="extentMembership"
                      placeholder="Extent Membership"
                      value={formData.extentMembership}
                      onChange={(e) => {
                        setFormData({ ...formData, extentMembership: e.target.value })
                        if (e.target.value !== '') {
                          setTotalAmount(planPrice + (parseInt(e.target.value) * 30) - offers - parseInt(formData.discount) + (planPrice * 0.18))
                        } else {
                          setTotalAmount(planPrice - offers + (planPrice * 0.18) - parseInt(formData.discount))
                        }
                      }
                      }
                    />
                    <input
                      className="Auth_Input"
                      type="text"
                      name="discount"
                      placeholder="Discount"
                      value={formData.discount}
                      onChange={(e) => {
                        setFormData({ ...formData, discount: e.target.value })
                        if (e.target.value !== '') {
                          setTotalAmount(planPrice - parseInt(e.target.value) - offers + (parseInt(formData.extentMembership) * 30) + (planPrice * 0.18))
                        } else {
                          setTotalAmount(planPrice - offers + (parseInt(formData.extentMembership) * 30) + (planPrice * 0.18))
                        }
                      }}
                    />
                    <input
                      className="Auth_Input"
                      type="text"
                      name="receiptNumber"
                      placeholder="Receipt Number"
                      value={formData.receiptNumber}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <select className="Auth_Input" onChange={(e) => setModeOfPayment(e.target.value)} value={modeOfPayment}>
                      <option value="select">Select Mode of Payment</option>
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                      <option value="online">Online</option>
                    </select>
                  </div>
                </div>
                <div className='PaymentSection-right'>
                  <div className='other-detail-container'>
                    <div style={{ display: "flex", gap: "2rem", marginLeft: "2rem", width: "30%" }}>
                      <div className='other-circle'></div>
                      <div className='special-offer-container'>
                        <label>Offers</label>
                        <span>₹ {offers}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "2rem", marginLeft: "2rem", width: "30%" }}>
                      <div className='other-circle'></div>
                      <div className='special-offer-container'>
                        <label>GST</label>
                        <span>₹ {planPrice * 0.18}</span>
                      </div>
                    </div>
                  </div>
                  <div className="PaymentSection_InputContainer_AddTrainee">
                    <input
                      className="Auth_Input"
                      type="text"
                      name="planPrice"
                      placeholder="Plan Price"
                      value={planPrice}
                      onChange={(e) => setPlanPrice(e.target.value)}
                    />
                    <input
                      className="Auth_Input"
                      type="text"
                      name="totalAmount"
                      placeholder="Total Amount"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                    />
                    <input
                      className="Auth_Input"
                      type="text"
                      name="amountPaid"
                      placeholder="Amount Paid"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                    />
                    <input
                      className="SignUp_Email Auth_Input"
                      type="text"
                      name="balanceAmount"
                      placeholder="Balance Amount"
                      value={totalAmount - amountPaid}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                <div className="SectionForm_ButtonContainer_AddTrainer" style={{ width: '90%' }}>
                  <button type="button" onClick={() => setTab(2)}>
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
              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="button" className="verify-btn" onClick={handleVerify}>
                  Verify
                </button>
                <button type="button" className="verify-btn" onClick={() => navigate('/dashboard', { state: { trainee: 9 } })}>
                  Skip
                </button>
              </div>

            </div>
          </div>
        </section>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default AddTrainee
