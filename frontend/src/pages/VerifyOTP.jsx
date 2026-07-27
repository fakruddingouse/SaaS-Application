import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const VerifyOTP = ({ email, setEmail }) => {

    const [ otp, setOtp ] = useState("");

    const navigate = useNavigate();

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            let payload = { email, otp };
            const response = await fetch(`http://localhost:4000/api/auth/verify-otp`, {
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
            toast.error(data.message);
            console.log(err.message);
        }
    }

    return (
        <div>
            <h1 className='text-3xl m-3'>OTP Verification</h1>
            <form onSubmit={handleVerifyOtp} className='flex flex-col gap-5 m-5'>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='Enter Email...'
                    />
                </div>
                <div>
                    <label htmlFor="otp">OTP: </label>
                    <input 
                        type="tel" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)} 
                        className="w-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='Validate OTP...'
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md w-100"
                >
                    Verify OTP
            </button>
            </form>
        </div>
    )
}

export default VerifyOTP
