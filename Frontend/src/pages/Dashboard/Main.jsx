import React, { useEffect } from 'react'
import DashboardOverview from './Pages/DashboardOverview'
import EnquiryOverview from './Pages/EnquiryOverview'
import MembershipOverview from './Pages/MembershipOverview'
import ServicesOverview from './Pages/ServicesOverview'
import StaffManagementOverview from './Pages/StaffManagementOverview'
import ReportsOverview from './Pages/ReportsOverview'
import OffersPackagesOverview from './Pages/OffersPackagesOverview'
import { useSelector, useDispatch } from 'react-redux'
import { getAllMembers} from '../../actions/gymOwnersAction'

function Main({ active }) {
  const dispatch = useDispatch()
  const { gymOwners } = useSelector((state) => state.gymOwners)

  useEffect(() => {
    dispatch(getAllMembers())
  }, [dispatch])

  return (
    <div style={{ height: '100%' }}>
      {active === 0 && <DashboardOverview />}
      {active === 1 && <EnquiryOverview />}
      {active === 2 && <MembershipOverview gymOwners={gymOwners}/>}
      {active === 3 && <ServicesOverview />}
      {active === 4 && <StaffManagementOverview />}
      {active === 5 && <ReportsOverview />}
      {active === 6 && <OffersPackagesOverview />}
    </div>
  )
}

export default Main
