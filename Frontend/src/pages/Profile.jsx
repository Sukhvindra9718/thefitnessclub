import React from 'react'
import {useLocation } from 'react-router-dom'


function Profile() {
    const location = useLocation();
    const user = location.state.user;
    const profileImage = location.state.profileImageSrc
    console.log(user,profileImage)
  return (
    <div className='profile-page'>Profile</div>
  )
}

export default Profile