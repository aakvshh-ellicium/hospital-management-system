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


function App() {

  return (
    <>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/personal-info' element={<UserInfo />} />
        <Route path='/family-info' element={<UserFamilyInfo />} />
        <Route path='/documents' element={<UserDocuments />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user-personal-info' element={<PersonalInfo />} />
        <Route path='/user-family-info' element={<FamilyInfo />} />
        <Route path='/user-documents' element={<Documents />} />
        <Route path='/dashboard/admin' element={<AdminDashboard />} />

      </Routes>
      <Toaster />
    </>
  )
}

export default App
