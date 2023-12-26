import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { TbCameraUp } from 'react-icons/tb'
import axios from 'axios'
import Loader from '../../../components/Loader'
const UpdateTrainer = ({ setUpdateVisible, user }) => {
  const [editMode, setEditMode] = useState(true)
  const [selectedFile, setSelectedFile] = useState('./DefaultUser.svg')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phonenumber: user.phonenumber,
    pincode: user.pincode,
    dob: user.dob,
    city: user.city,
    aadharcard: user.aadharcard,
    state: user.state,
    address: user.address,
    country: user.country,
    joiningdate: user.joiningdate,
    status: user.status,
    profile_image:'',
    bankname: user.bankname,
    accountnumber: user.accountnumber,
    ifsccode: user.ifsccode,
    salary: user.salary
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
    setLoading(true)
    if (
      formData.firstname === '' ||
      formData.lastname === '' ||
      formData.email === '' ||
      formData.phonenumber === '' ||
      formData.pincode === '' ||
      formData.dob === '' ||
      formData.city === '' ||
      formData.aadharcard === '' ||
      formData.state === '' ||
      formData.address === '' ||
      formData.country === '' ||
      formData.joiningdate === '' ||
      formData.status === '' ||
      formData.bankname === '' ||
      formData.accountnumber === '' ||
      formData.ifsccode === '' ||
      formData.salary === ''
    ) {
      alert('all fields are required')
      return
    }
    const newFormData = new FormData()
    newFormData.append('firstname', formData.firstname)
    newFormData.append('lastname', formData.lastname)
    newFormData.append('email', formData.email)
    newFormData.append('phonenumber', formData.phonenumber)
    newFormData.append('pincode', formData.pincode)
    newFormData.append('dob', formData.dob)
    newFormData.append('city', formData.city)
    newFormData.append('aadharcard', formData.aadharcard)
    newFormData.append('state', formData.state)
    newFormData.append('address', formData.address)
    newFormData.append('country', formData.country)
    newFormData.append('joiningdate', formData.joiningdate)
    newFormData.append('status', formData.status)
    newFormData.append('profile_image', formData.profile_image)
    newFormData.append('bankname', formData.bankname)
    newFormData.append('accountnumber', formData.accountnumber)
    newFormData.append('ifsccode', formData.ifsccode)
    newFormData.append('salary', formData.salary)
    newFormData.append('id', user.id)

    if(formData.profile_image === ''){
        newFormData.delete('profile_image')
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    }
    await axios
      .put('http://192.168.1.12:3001/api/v1/trainer/update/profile', newFormData, config)
      .then((res) => {
        if (res.data.success) {
          alert('Trainer Updated Successfully')
          setLoading(false)
          window.location.reload()
        } else {
          alert(res.data.message)
          setLoading(false)
        }
      })
      .catch((error) => {
        if (error.isAxiosError && error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          alert(`Error: ${errorMessage}`);
          setLoading(false)
        } else {
          alert('An unexpected error occurred. Please try again.');
          setLoading(false)
        }
      })
  }

  return loading?(<Loader loading={loading}/>):(
    <div className="Auth_Modal">
      <div className="Auth_Container MyAccount_Container">
        <div className="Auth_Logo">
          <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
        </div>
        <div onClick={handleUpdateVisibility} className="AuthCloseButton">
          <img className="CloseImage" src="./close.svg" alt="" />
        </div>
        <div className="MyAccount_InputContainer">
          <input
            className="Auth_Input"
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
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
          <input
            className="Auth_Input"
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            value={formData.phonenumber}
            onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          <input
            className="Auth_Input"
            type="text"
            name="dob"
            placeholder="DOB"
            value={new Date(formData.dob).toLocaleString().split(',')[0]}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          />

          <input
            className="Auth_Input"
            type="text"
            name="adhaarcardno"
            placeholder="Aadhar Card No"
            value={formData.aadharcard}
            onChange={(e) => setFormData({ ...formData, aadharcard: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />

          <input
            className="Auth_Input"
            type="text"
            name="joiningdate"
            placeholder="Joining Date"
            value={new Date(formData.joiningdate).toLocaleString().split(',')[0]}
            onChange={(e) => setFormData({ ...formData, joiningdate: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="status"
            placeholder="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />

          <input
            className="Auth_Input"
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="bankname"
            placeholder="Bank Name"
            value={formData.bankname}
            onChange={(e) => setFormData({ ...formData, bankname: e.target.value })}
          />

          <input
            className="Auth_Input"
            type="text"
            name="accountnumber"
            placeholder="Account Number"
            value={formData.accountnumber}
            onChange={(e) => setFormData({ ...formData, accountnumber: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="ifsccode"
            placeholder="IFSC Code"
            value={formData.ifsccode}
            onChange={(e) => setFormData({ ...formData, ifsccode: e.target.value })}
          />
          <input
            className="Auth_Input"
            type="text"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />
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

export default UpdateTrainer
