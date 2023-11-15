import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state.user
  const profileImage = location.state.profileImageSrc
  console.log(user, profileImage)

  const selectedFields = [
    'id',
    'name',
    'email',
    'phonenumber',
    'address',
    'role',
    'profile_image',
    'createdat',
    'membership_price',
    'membership_duration',
    'membership_type',
    'adhaarcardno',
    'RecentCertificate',
    'prebookedate',
    'status'
  ]
  return (
    <div className="profile-page Page">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {selectedFields.map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {selectedFields.map((field, index) => (
                <td key={index}>{user[field]}</td>
              ))}
            </tr>
          </tbody>
        </table>
        {profileImage && (
          <div className="profile-image">
            <img src={profileImage} alt="Profile" />
          </div>
        )}
      </div>

    </div>
  )
}

export default Profile

