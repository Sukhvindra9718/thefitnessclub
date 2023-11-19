import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CompleteProfileDetails from './pages/CompleteProfile/CompleteProfileDetails.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import AddTrainer from './pages/Dashboard/AddTrainer/AddTrainer.jsx'
import AddTrainee from './pages/Dashboard/AddTrainee/AddTrainee.jsx'
import Cookies from 'js-cookie'
import { useDispatch,useSelector} from 'react-redux'
import { getLoginUser } from './actions/gymOwnersAction.js'

function App() {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.getLoginUserDetail)

  useEffect(() => {
    console.log('app',user)
    const id = Cookies.get('id')
    return () =>{
      dispatch(getLoginUser(id))
    }
  } , [dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/addtrainer' element={<AddTrainer/>}/>
          <Route path='/addtrainee' element={<AddTrainee/>}/>
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/completeprofiledetails" element={<CompleteProfileDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
