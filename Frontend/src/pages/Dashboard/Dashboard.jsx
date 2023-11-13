import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import '../../Style/Dashboard.css'



function Dashboard() {
  const [active,setActive]=React.useState(0)
  return (
    <div className="dashboard">
      <div className='sidebar'>
        <Sidebar active={active} setActive={setActive}/>
      </div>
      <div className='dashboard-main'>
        <Main active={active}/>
      </div>
    </div>
  )
}

export default Dashboard
