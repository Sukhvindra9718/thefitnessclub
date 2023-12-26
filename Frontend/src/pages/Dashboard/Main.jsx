import React, { useEffect} from 'react'
import DashboardOverview from './AdminPages/DashboardOverview'
import EnquiryOverview from './AdminPages/EnquiryOverview'
import MembershipOverview from './AdminPages/MembershipOverview'
import ServicesOverview from './AdminPages/ServicesOverview'
import StaffManagementOverview from './AdminPages/StaffManagementOverview'
import ReportsOverview from './AdminPages/ReportsOverview'
import OffersPackagesOverview from './AdminPages/OffersPackagesOverview'
import DashboardOverviewGym from "../Dashboard/GymOwnerPages/DashboardOverview"
import TrainerOverviewGym from "../Dashboard/GymOwnerPages/TrainerOverview"
import TraineeOverviewGym from "../Dashboard/GymOwnerPages/TraineeOverview"
import { useSelector, useDispatch } from 'react-redux'
import { getAllMembers} from '../../actions/gymOwnersAction'
import Loader from '../../components/Loader.jsx'
import { useNavigate } from 'react-router-dom'

function Main({ active }) {
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { gymOwners } = useSelector((state) => state.gymOwners)


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))
    setUser(data)
    if(data){
      setLoading(false);
    }else{
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if(user?.role === 'admin'){
      return ()=>{
        dispatch(getAllMembers());
      }
    }
  }, [])

  return loading?(<Loader loading={loading}/>):(
    <div className='main'>
      {active === 0 && user?.role === 'admin' && <DashboardOverview />}
      {active === 1 && user?.role === 'admin' && <EnquiryOverview />}
      {active === 2 && user?.role === 'admin' && <MembershipOverview gymOwners={gymOwners}/>}
      {active === 3 && user?.role === 'admin' && <ServicesOverview />}
      {active === 4 && user?.role === 'admin' && <StaffManagementOverview />}
      {active === 5 && user?.role === 'admin' && <ReportsOverview />}
      {active === 6 && user?.role === 'admin' && <OffersPackagesOverview />}
      {active === 0 && user?.role === 'gymOwner' && <DashboardOverviewGym />}
      {active === 8 && user?.role === 'gymOwner' && <TrainerOverviewGym/>}
      {active === 9 && user?.role === 'gymOwner' && <TraineeOverviewGym/>}
    </div>
  )
}

export default Main
