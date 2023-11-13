import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CompleteProfileDetails from './pages/CompleteProfileDetails.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import { useSelector,useDispatch } from 'react-redux'
import { getLoginUser } from './actions/gymOwnersAction.js'
import Profile from './pages/Profile.jsx'

function App() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.getLoginUserDetail);

  useEffect(() => {
    dispatch(getLoginUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout user={user}/>}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/completeprofiledetails" element={<CompleteProfileDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
