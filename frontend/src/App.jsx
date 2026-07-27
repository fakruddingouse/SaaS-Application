import React, { useContext, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import LoginAndSignup from './pages/LoginAndSignup'
import VerifyOTP from './pages/VerifyOTP';

import { AuthContext } from './context/AuthContext';

const App = () => {

	const { user, setUser, email, setEmail, otp, setOtp } = useContext(AuthContext);

	return (
		<div>
			<Toaster />
			<Routes>
				<Route path='/' element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/login" />} />

				<Route path='/login' element={<LoginAndSignup user={user} setUser={setUser} />} />

				<Route path='/verify-otp' element={<VerifyOTP email={email} setEmail={setEmail} />} />

			</Routes>
		</div>
	)
}

export default App
