import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { TbCameraUp } from 'react-icons/tb'
import axios from 'axios'
import { CitySelect, CountrySelect, StateSelect } from '@davzon/react-country-state-city'
import '@davzon/react-country-state-city/dist/react-country-state-city.css'



const UpdateTrainee = ({ setUpdateVisible, user, setToastMessage, setToastType, setToastVisible }) => {
    const [editMode, setEditMode] = useState(true)
    const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')
    const [countryid, setCountryid] = useState(0)
    const [stateid, setstateid] = useState(0)

    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        address: user.address,
        dob: user.dob,
        pincode: user.pincode,
        aadharcard: user.aadharcard,
        country: user.country,
        joiningdate: user.joiningdate,
        state: user.state,
        status: user.status,
        city: user.city,
        gender: user.gender,
        profile_image: ''
    })
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(URL.createObjectURL(file))
            setFormData({ ...formData, profile_image: file })
        } else {
            setSelectedFile('./DefaultUser.svg')
        }
    }
    const handleUpdateVisibility = () => {
        document.body.style.overflow = 'auto'
        setUpdateVisible((updateVisible) => !updateVisible)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            formData.firstname === '' ||
            formData.lastname === '' ||
            formData.email === '' ||
            formData.phonenumber === '' ||
            formData.address === '' ||
            formData.dob === '' ||
            formData.pincode === '' ||
            formData.aadharcard === '' ||
            formData.country === '' ||
            formData.joiningdate === '' ||
            formData.state === '' ||
            formData.status === '' ||
            formData.city === '' ||
            formData.gender === ''
        ) {
            setToastType('info')
            setToastMessage('Please fill all the fields')
            setToastVisible((toastVisible) => !toastVisible)
            return
        }
        const newFormData = new FormData()
        newFormData.append('firstname', formData.firstname)
        newFormData.append('lastname', formData.lastname)
        newFormData.append('email', formData.email)
        newFormData.append('phonenumber', formData.phonenumber)
        newFormData.append('address', formData.address)
        newFormData.append('dob', formData.dob)
        newFormData.append('pincode', formData.pincode)
        newFormData.append('aadharcard', formData.aadharcard)
        newFormData.append('country', formData.country)
        newFormData.append('joiningdate', formData.joiningdate)
        newFormData.append('state', formData.state)
        newFormData.append('status', formData.status)
        newFormData.append('city', formData.city)
        newFormData.append('gender', formData.gender)
        newFormData.append('profile_image', formData.profile_image)
        newFormData.append('userId', user.id)

        if (formData.profile_image === '') {
            newFormData.delete('profile_image')
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }
        await axios
            .put('http://localhost:3001/api/v1/trainee/update/profile', newFormData, config)
            .then((res) => {
                if (res.data.success) {
                    setToastType('success')
                    setToastMessage('Trainee Updated Successfully')
                    setToastVisible((toastVisible) => !toastVisible)
                    handleUpdateVisibility()
                } else {
                    setToastType('error')
                    setToastMessage(res.data.message)
                    setToastVisible((toastVisible) => !toastVisible)
                }

            })
            .catch((error) => {
                if (error.isAxiosError && error.response && error.response.data) {
                    const errorMessage = error.response.data.message;
                    setToastMessage(errorMessage);
                    setToastType('error');
                    setToastVisible((toastVisible) => !toastVisible)
                } else {
                    setToastMessage('An unexpected error occurred. Please try again.');
                    setToastType('error');
                    setToastVisible((toastVisible) => !toastVisible)
                }
            })
    }
    return (
        <div className="Auth_Modal">
            <div className="Auth_Container MyAccount_Container">
                <div className="Auth_Logo">
                    <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
                </div>
                <div onClick={handleUpdateVisibility} className="AuthCloseButton">
                    <img className="CloseImage" src="./close.svg" alt="" />
                </div>
                <div style={{ width: "100%" }}>
                    <h3 style={{ marginBottom: "1rem" }}>Personal Details</h3>

                    <div className="MyAccount_InputContainer">
                        <div>
                            <label>First Name</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                            />
                        </div>
                        <div className="Custom_ImageUploader_Preview_Container_Profile">
                            <div className="profile-img-container">
                                {editMode === true && (
                                    <input
                                        className="FileUploader"
                                        type="file"
                                        accept=".jpg, .png,"
                                        onChange={handleFileChange}
                                        name="profileImage"
                                    />
                                )}
                                {selectedFile === './DefaultUser.svg' && (
                                    <img
                                        src={'data:image/jpeg;base64,' + user.profile_image}
                                        alt="Preview"
                                        className="Custom_ImageUploader_Preview"
                                    />
                                )}
                                {selectedFile !== './DefaultUser.svg' && (
                                    <img src={selectedFile} alt="Preview" className="Custom_ImageUploader_Preview" />
                                )}
                                <span className="profile-img-text">Profile Image</span>
                                <TbCameraUp className="UploadImageIcon" />
                            </div>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={formData.lastname}
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Email Address</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="phonenumber"
                                placeholder="Phone Number"
                                value={formData.phonenumber}
                                onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Address</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Date Of Birth</label>
                            <input
                                className="Auth_Input"
                                type="date"
                                name="dob"
                                placeholder="DOB"
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Pincode</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Aadhar Card</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="adhaarcardno"
                                placeholder="Aadhar Card No"
                                value={formData.aadharcard}
                                onChange={(e) => setFormData({ ...formData, aadharcard: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Country</label>
                            <CountrySelect
                                onChange={(e) => {
                                    setCountryid(e.id)
                                    setFormData({
                                        ...formData,
                                        country: e.name
                                    })
                                }}
                                placeHolder={`${user.country}`}
                                inputClassName="Auth_Input"
                            // defaultValue={{id:"101",name:"India"}}
                            />

                        </div>
                        <div>
                            <label>Joining Date</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="joiningdate"
                                placeholder="Joining Date"
                                value={new Date(user.joiningdate).toLocaleString().split(',')[0]}
                                onChange={(e) => setFormData({ ...formData, joiningdate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>State</label>
                            <StateSelect
                                countryid={countryid}
                                onChange={(e) => {
                                    setstateid(e.id)
                                    setFormData({
                                        ...formData,
                                        state: e.name
                                    })
                                }}
                                placeHolder={`${user.state}`}
                                inputClassName="Auth_Input"
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
                        <div>
                            <label>City</label>
                            <CitySelect
                                countryid={countryid}
                                stateid={stateid}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        city: e.name
                                    })
                                }}
                                placeHolder={`${user.city}`}
                                inputClassName="Auth_Input"
                            />
                        </div>
                        <div>
                            <label>Verified</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="verified"
                                placeholder="Email Verified"
                                value={user.isverified ? 'Verified' : 'Not Verified'}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Gender</label>
                            <select
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                value={formData.gender}
                                className="Auth_Input">
                                <option value="select">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", marginTop: "1rem" }}>
                    <h3 style={{ marginBottom: "1rem" }}>Membership Details</h3>
                    <div className='MyAccount_InputContainer'>
                        <div>
                            <label>Group</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="Group"
                                placeholder="Group"
                                value={user.groups}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Membership Plan</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="plan"
                                placeholder="Plan"
                                value={user.plan}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Plan Price</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="planPrice"
                                placeholder="Plan Price"
                                value={user.planprice}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Plan Duration</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="duration"
                                placeholder="Plan Duration"
                                value={user.duration + (user.duration === 1 ? ' Month' : ' Months')}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Total Payable Amount</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="totalAmount"
                                placeholder="Total Amount"
                                value={user.totalamount}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Mode of Payment</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="modeofpayment"
                                placeholder="Mode of Payment"
                                value={user.modeofpayment}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Paid Amount</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="paidAmount"
                                placeholder="Paid Amount"
                                value={user.amountpaid}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Balance Amount</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="balanceAmount"
                                placeholder="Balance Amount"
                                value={user.balanceamount}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Plan Start Date</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="planstartdate"
                                placeholder="Plan Start Date"
                                value={new Date(user.planstartdate).toLocaleString().split(',')[0]}
                                readOnly={true}
                            />
                        </div>
                        <div>
                            <label>Plan End Date</label>
                            <input
                                className="Auth_Input"
                                type="text"
                                name="planenddate"
                                placeholder="Plan End Date"
                                value={new Date(user.planenddate).toLocaleString().split(',')[0]}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="Auth_ButtonContainer">
                    <button className="Auth_Button" onClick={handleSubmit}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateTrainee
