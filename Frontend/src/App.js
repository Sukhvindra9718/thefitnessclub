import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
