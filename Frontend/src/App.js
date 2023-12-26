import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CompleteProfileDetails from './pages/CompleteProfile/CompleteProfileDetails.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import AddTrainer from './pages/Dashboard/AddTrainer/AddTrainer.jsx'
import AddTrainee from './pages/Dashboard/AddTrainee/AddTrainee.jsx'
import axios from 'axios'
import Cookies from 'js-cookie'

function App() {
  useEffect(() => {
    // Function to be executed every day
    const updateRevenueTraineeCount = () => {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      }

      axios
        .put(`http://localhost:3001/api/v1/updateRevenueTraineeCount`, config)
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    // Set up an interval to execute the function every day
    const intervalId = setInterval(() => {
      updateRevenueTraineeCount()
    }, 24 * 60 * 60 * 1000) // 24 hours interval

    // Clear the interval if the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/completeprofiledetails" element={<CompleteProfileDetails />} />
        <Route path="/addtrainer" element={<AddTrainer />} />
        <Route path="/addtrainee" element={<AddTrainee />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
