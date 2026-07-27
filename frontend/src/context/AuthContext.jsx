import React, { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const backendUrl = "http://localhost:4000/api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(() => {
        return localStorage.getItem('accessToken') || null
    });
    const [ state, setState ] = useState("Login");
    const [ username, setUsername ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    
    const navigate = useNavigate();

    function capitalizeFirstLetter(str) {
        if (!str) return ""; 
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Handling Sign Up logic
    const handleSignup = async (credentials) => {
        // e.preventDefault();
        try {
            const signupURL = `${backendUrl}/signup`;

            const response = await fetch(signupURL, {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`OTP Verification pending for user ${credentials.username}`);
                navigate('/verify-otp');
                toast.success(data.message);
            } else {
                toast.error(message);
            }
            
        } catch (error) {
            console.log(error.message);
            toast.error(data.message);
        }
    } 

    // Handling Login logic
    const handleLogin = async (credentials) => {
        //e.preventDefault();
        try {
            const loginUrl = `${backendUrl}/login`;

            const response = await fetch(loginUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();
            const user = data.user;
            if (response.ok) {
                localStorage.setItem('accessToken', data.accessToken);
                setUser(data.accessToken);
                navigate("/");
                toast.success(data.message);
            } else {
                toast.error(data.message);
                console.log(data.message || "Authentication failed!")
            }
        } catch (error) {
            toast.error(data.message);
            console.log(error);
        }
    };

    const value = {
        user,
        setUser, 
        email, 
        setEmail, 
        handleSignup, 
        handleLogin        
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}