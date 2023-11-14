import React, { useState, useEffect } from 'react'
import { BiHelpCircle, BiSolidDashboard, BiSolidOffer } from 'react-icons/bi'
import { IoSendSharp } from 'react-icons/io5'
import { MdManageAccounts, MdCardMembership, MdOutlineHomeRepairService } from 'react-icons/md'
import { GoReport } from 'react-icons/go'
import {FaChalkboardTeacher} from "react-icons/fa"
import {PiStudentBold} from "react-icons/pi"
import Cookies from 'js-cookie'

function Sidebar({ active, setActive }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    console.log("hi")
    const demo = Cookies.get('user')
    setUser(demo ? JSON.parse(demo) : null)
  }, [])
  return (
    <div>
      <div className="sidebar-logo">
        <img className="sidebar-img" src="./Logo.png" alt="Logo" />
      </div>

      <div className="sidebar-menu">
        {user?.role === 'admin' && <div
          className={active === 0 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(0)}>
          <BiSolidDashboard fill={active === 0 ? '#fff' : '#717171'} size={30} />
          <h4>Dashboard</h4>
        </div>}

        {user?.role === 'admin' && <div
          className={active === 1 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(1)}>
          <IoSendSharp fill={active === 1 ? '#fff' : '#717171'} size={30} />
          <h4>Enquiry</h4>
        </div>}

        {user?.role === 'admin' && <div
          className={active === 2 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(2)}>
          <MdCardMembership fill={active === 2 ? '#fff' : '#717171'} size={30} />
          <h4>Memberships</h4>
        </div>}
        {user?.role === 'admin' && <div
          className={active === 3 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(3)}>
          <MdOutlineHomeRepairService fill={active === 3 ? '#fff' : '#717171'} size={30} />
          <h4>Services</h4>
        </div>}
        {user?.role === 'admin' && <div
          className={active === 4 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(4)}>
          <MdManageAccounts fill={active === 4 ? '#fff' : '#717171'} size={30} />
          <h4>Staff Management</h4>
        </div>}
        {user?.role === 'admin' && <div
          className={active === 5 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(5)}>
          <GoReport fill={active === 5 ? '#fff' : '#717171'} size={30} />
          <h4>Reports</h4>
        </div>}
        {user?.role === 'admin' && <div
          className={active === 6 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(6)}>
          <BiSolidOffer fill={active === 6 ? '#fff' : '#717171'} size={30} />
          <h4>Offers & Packages</h4>
        </div>}

        {user?.role === 'gymOwner' && <div
          className={active === 7 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(7)}>
          <BiSolidDashboard fill={active === 7 ? '#fff' : '#717171'} size={30} />
          <h4>Dashboard</h4>
        </div>}
        {user?.role === 'gymOwner' && <div
          className={active === 8 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(8)}>
          <FaChalkboardTeacher fill={active === 8 ? '#fff' : '#717171'} size={30} />
          <h4>Trainers</h4>
        </div>}
        {user?.role === 'gymOwner' && <div
          className={active === 9 ? 'sidebar-menu-item selected' : 'sidebar-menu-item'}
          onClick={() => setActive(9)}>
          <PiStudentBold fill={active === 9 ? '#fff' : '#717171'} size={30} />
          <h4>Trainee</h4>
        </div>}
      </div>

      <div className="sidebar-footer">
        <BiHelpCircle fill="#717171" size={30} />
        <h4>Help</h4>
      </div>
    </div>
  )
}

export default Sidebar
