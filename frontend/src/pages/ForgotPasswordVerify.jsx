import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from '../hooks/useAuth';

const ForgotPasswordVerify = ({ email, setEmail }) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { verifyForgotPassword } = useAuth();

    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        await verifyForgotPassword({ email, otp, newPassword });
    };

    return (
        <div className='flex items-center justify-center min-h-screen w-screen bg-gray-50'>
            <div className='flex flex-col justify-center max-w-md w-full p-6 bg-white rounded-xl shadow-lg'>
                <h1 className='text-3xl font-bold text-center mb-4'>Reset Password</h1>
                
                <form onSubmit={handleResetPassword} className='flex flex-col gap-5'>
                    {/* Email Input */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-medium text-gray-700'>Email: </label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Enter Email...'
                            required
                        />
                    </div>

                    {/* OTP Input */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="otp" className='font-medium text-gray-700'>OTP: </label>
                        <input 
                            type="tel" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Enter Reset OTP...'
                            required
                        />
                    </div>

                    {/* New Password Input */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="newPassword" className='font-medium text-gray-700'>New Password: </label>
                        <input 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Enter New Password...'
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md w-full mt-2"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordVerify;
