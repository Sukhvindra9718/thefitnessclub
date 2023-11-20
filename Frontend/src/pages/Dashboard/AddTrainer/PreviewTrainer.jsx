import React from 'react'

const PreviewTrainer = ({ setPreviewVisible, user }) => {
  const handlePreviewVisibility = () => {
    document.body.style.overflow = 'auto'
    setPreviewVisible((profileVisible) => !profileVisible)
  }

  return (
    <div className="Auth_Modal">
      <div className="Auth_Container MyAccount_Container">
        <div className="Auth_Logo">
          <img className="Auth_Logo_Image" src="./Logo.png" alt="Logo" />
        </div>
        <div onClick={handlePreviewVisibility} className="AuthCloseButton">
          <img className="CloseImage" src="./close.svg" alt="" />
        </div>
        <div className="MyAccount_InputContainer">
          <input
            className="Auth_Input"
            type="text"
            name="firstname"
            placeholder="First Name"
            value={user.firstname}
            readOnly={true}
          />
          <div className="Custom_ImageUploader_Preview_Container_Profile">
            <div className="profile-img-container">
              <img
                src={'data:image/jpeg;base64,' + user.profile_image}
                alt="Preview"
                className="Custom_ImageUploader_Preview"
              />
            </div>
          </div>
          <input
            className="Auth_Input"
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={user.lastname}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            value={user.phonenumber}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            readOnly={true}
          />

          <input
            className="Auth_Input"
            type="text"
            name="dob"
            placeholder="DOB"
            value={new Date(user.dob).toLocaleString().split(',')[0]}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={user.pincode}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="adhaarcardno"
            placeholder="Aadhar Card No"
            value={user.aadharcard}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="city"
            placeholder="City"
            value={user.city}
            readOnly={true}
          />

          <input
            className="Auth_Input"
            type="text"
            name="joiningdate"
            placeholder="Joining Date"
            value={new Date(user.joiningdate).toLocaleString().split(',')[0]}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="state"
            placeholder="State"
            value={user.state}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="status"
            placeholder="Status"
            value={user.status}
            readOnly={true}
          />

          <input
            className="Auth_Input"
            type="text"
            name="country"
            placeholder="Country"
            value={user.country}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="bankname"
            placeholder="Bank Name"
            value={user.bankname}
            readOnly={true}
          />

          <input
            className="Auth_Input"
            type="text"
            name="accountnumber"
            placeholder="Account Number"
            value={user.accountnumber}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="ifsccode"
            placeholder="IFSC Code"
            value={user.ifsccode}
            readOnly={true}
          />
          <input
            className="Auth_Input"
            type="text"
            name="salary"
            placeholder="Salary"
            value={user.salary}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  )
}

export default PreviewTrainer
