  import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import UserInfo from './pages/UserInfo/UserInfo'
import SignUp from './pages/SignUp/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import PersonalInfo from './pages/PersonalInfo/PersonalInfo'
import FamilyInfo from './pages/FamilyInfo/FamilyInfo'
import Documents from './pages/Documents/Documents'
import UserFamilyInfo from './pages/UserFamilyInfo/UserFamilyInfo'
import UserDocuments from './pages/UserDocuments/UserDocuments'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import { Toaster } from 'react-hot-toast'
import Protected from './components/Protected/Protected'
import Modal from './components/AdminDashboard/Modal'


function App() {

  return (
    <>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/personal-info' element={<Protected Component={UserInfo} />} />
        <Route path='/family-info' element={<Protected Component={UserFamilyInfo} />} />
        <Route path='/documents' element={<Protected Component={UserDocuments} />} />
        <Route path='/dashboard' element={<Protected Component={Dashboard} />} />
        <Route path='/user-personal-info' element={<Protected Component={PersonalInfo} />} />
        <Route path='/user-family-info' element={<Protected Component={FamilyInfo} />} />
        <Route path='/user-documents' element={<Protected Component={Documents} />} />
        <Route path='/dashboard/admin/modal' element={<Protected Component={Modal} />} />
        <Route path='/dashboard/admin' element={<Protected Component={AdminDashboard} />} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App
