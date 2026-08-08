import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const VerifyOTP = ({ email, setEmail }) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [ otp, setOtp ] = useState("");

    const navigate = useNavigate();

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            let payload = { email, otp };
            const response = await fetch(`${backendURL}/auth/verify-otp`, {
                method: "POST", 
                headers: {
                'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(payload)
            })
            const data = await response.json();

            if (response.ok) {
                console.log(`OTP Verification successful!`);
                navigate("/");
                toast.success(data.message);
            } else {
                toast.error(data.message);
                console.log(data.message || "OTP Verification failed!")
            }
        } catch (err) {
            toast.error(err.message); 
            console.log(err.message);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen w-screen bg-gray-50'>
            <div className='flex flex-col justify-center max-w-md w-full p-6 bg-white rounded-xl shadow-lg'>
                <h1 className='text-3xl font-bold text-center mb-4'>OTP Verification</h1>
                <form onSubmit={handleVerifyOtp} className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-medium text-gray-700'>Email: </label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Enter Email...'
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="otp" className='font-medium text-gray-700'>OTP: </label>
                        <input 
                            type="tel" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Validate OTP...'
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md w-full mt-2"
                    >
                        Verify OTP
                </button>
                </form>
            </div>
        </div>
    )
}

export default VerifyOTP
