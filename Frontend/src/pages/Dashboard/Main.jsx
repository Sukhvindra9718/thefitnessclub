import React, { useEffect, useState } from 'react'
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
import Cookies from 'js-cookie'

function Main({ active }) {
  const [user,setUser] = useState(null)
  const dispatch = useDispatch()
  const { gymOwners } = useSelector((state) => state.gymOwners)

  useEffect(() => {
    dispatch(getAllMembers());
    const demo = Cookies.get('user');
    setUser(demo? JSON.parse(demo):null)
  }, [dispatch])

  return (
    <div style={{ height: '100%' }}>
      {active === 0 && user?.role === 'admin' && <DashboardOverview />}
      {active === 1 && user?.role === 'admin' && <EnquiryOverview />}
      {active === 2 && user?.role === 'admin' && <MembershipOverview gymOwners={gymOwners}/>}
      {active === 3 && user?.role === 'admin' && <ServicesOverview />}
      {active === 4 && user?.role === 'admin' && <StaffManagementOverview />}
      {active === 5 && user?.role === 'admin' && <ReportsOverview />}
      {active === 6 && user?.role === 'admin' && <OffersPackagesOverview />}
      {active === 7 && user?.role === 'gymOwner' && <DashboardOverviewGym />}
      {active === 8 && user?.role === 'gymOwner' && <TrainerOverviewGym trainers={gymOwners}/>}
      {active === 9 && user?.role === 'gymOwner' && <TraineeOverviewGym trainees={gymOwners}/>}
    </div>
  )
}

export default Main
