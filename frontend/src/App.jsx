import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import LoginAndSignup from './pages/LoginAndSignup'
import VerifyOTP from './pages/VerifyOTP';
import ForgotPasswordVerify from './pages/ForgotPasswordVerify';
import RequireEmail from './components/RequireEmail';
import RequireGuest from './components/RequireGuest';

import { useAuth } from './hooks/useAuth';

const App = () => {

  const { user, setUser, email, setEmail } = useAuth();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/login" replace />} />

        <Route path='/login' element={
          <RequireGuest user={user}>
            <LoginAndSignup user={user} setUser={setUser} />
          </RequireGuest>
        } />

        <Route path='/verify-otp' element={
          <RequireEmail email={email}>
            <VerifyOTP email={email} setEmail={setEmail} />
          </RequireEmail>
        } />

        <Route path='/forgot-password-verify' element={
          <RequireEmail email={email}>
            <ForgotPasswordVerify email={email} setEmail={setEmail} />
          </RequireEmail>
        } />

      </Routes>
    </div>
  )
}

export default App