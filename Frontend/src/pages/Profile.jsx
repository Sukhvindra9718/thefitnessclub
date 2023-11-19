import React from 'react'


function Profile({profileImageSrc, user,setProfileVisible}) {
  console.log(user, profileImageSrc)

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
        {profileImageSrc && (
          <div className="profile-image">
            <img src={profileImageSrc} alt="Profile" />
          </div>
        )}
      </div>

    </div>
  )
}

export default Profile

