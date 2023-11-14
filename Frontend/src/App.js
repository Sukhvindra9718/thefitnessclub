import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CompleteProfileDetails from './pages/CompleteProfile/CompleteProfileDetails.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/completeprofiledetails" element={<CompleteProfileDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
