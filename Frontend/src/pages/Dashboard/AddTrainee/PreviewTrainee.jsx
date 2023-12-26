import React from 'react'

const PreviewTrainee = ({ setPreviewVisible, user }) => {
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
        <div style={{ width: "100%"}}>
          <h3 style={{marginBottom:"1rem"}}>Personal Details</h3>

          <div className="MyAccount_InputContainer">
            <div>
              <label>First Name</label>
              <input
                className="Auth_Input"
                type="text"
                name="firstname"
                placeholder="First Name"
                value={user.firstname}
                readOnly={true}
              />
            </div>

            <div className="Custom_ImageUploader_Preview_Container_Profile">
              <div className="profile-img-container">
                <img
                  src={'data:image/jpeg;base64,' + user.profile_image}
                  alt="Preview"
                  className="Custom_ImageUploader_Preview"
                />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <input
                className="Auth_Input"
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={user.lastname}
                readOnly={true}
              />
            </div>
            <div>
              <label>Email Address</label>
              <input
                className="Auth_Input"
                type="text"
                name="email"
                placeholder="Email"
                value={user.email}
                readOnly={true}
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                className="Auth_Input"
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={user.phonenumber}
                readOnly={true}
              />
            </div>
            <div>
              <label>Address</label>
              <input
                className="Auth_Input"
                type="text"
                name="address"
                placeholder="Address"
                value={user.address}
                readOnly={true}
              />
            </div>
            <div>
              <label>Date Of Birth</label>
              <input
                className="Auth_Input"
                type="text"
                name="dob"
                placeholder="DOB"
                value={new Date(user.dob).toLocaleString().split(',')[0]}
                readOnly={true}
              />
            </div>
            <div>
              <label>Pincode</label>
              <input
                className="Auth_Input"
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={user.pincode}
                readOnly={true}
              />
            </div>
            <div>
              <label>Aadhar Card</label>
              <input
                className="Auth_Input"
                type="text"
                name="adhaarcardno"
                placeholder="Aadhar Card No"
                value={user.aadharcard}
                readOnly={true}
              />
            </div>
            <div>
              <label>City</label>
              <input
                className="Auth_Input"
                type="text"
                name="city"
                placeholder="City"
                value={user.city}
                readOnly={true}
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
                readOnly={true}
              />
            </div>
            <div>
              <label>State</label>
              <input
                className="Auth_Input"
                type="text"
                name="state"
                placeholder="State"
                value={user.state}
                readOnly={true}
              />
            </div>
            <div>
              <label>Status</label>
              <input
                className="Auth_Input"
                type="text"
                name="status"
                placeholder="Status"
                value={user.status}
                readOnly={true}
              />
            </div>
            <div>
              <label>Country</label>
              <input
                className="Auth_Input"
                type="text"
                name="country"
                placeholder="Country"
                value={user.country}
                readOnly={true}
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
              <input
                className="Auth_Input"
                type="text"
                name="gender"
                placeholder="Gender"
                value={user.gender}
                readOnly={true}
              />
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

      </div>
    </div>
  )
}

export default PreviewTrainee
