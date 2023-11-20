import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Main from './Main'
import '../../Style/Dashboard.css'
import {useLocation} from 'react-router-dom'



function Dashboard() {
  const [active,setActive]=React.useState(0)
  const {state} = useLocation();

  useEffect(() => {
    if(state?.trainer){
      setActive(state.trainer)
      delete state.trainer
    }
  }, [])

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
