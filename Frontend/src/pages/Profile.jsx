import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'


function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

  return (
    <div className='profile-page'>Profile</div>
  )
}

export default Profile