import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginAndSignup from './pages/LoginAndSignup'

const App = () => {

	const [ user, setUser ] = useState(() => {
	return localStorage.getItem('accessToken') || null
	});

	return (
		<div>
			<Routes>

				<Route path='/' element={user ? <HomePage user={user} setUser={setUser} /> : <Navigate to="/login" />} />

				<Route path='/login' element={<LoginAndSignup user={user} setUser={setUser} />} />

			</Routes>
		</div>
	)
}

export default App
