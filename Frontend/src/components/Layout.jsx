import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'

function Layout({user}) {
  return (
    <div className="Layout">
      <Header user={user}/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
