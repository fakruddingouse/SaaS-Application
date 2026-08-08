import { createContext, useMemo, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { getUser, removeUser, setUserStorage, getToken, setToken, removeToken } from "../utils/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(getUser());
    const [email, setEmail] = useState("");

    const login = async (credentials) => {
        try {
            const { data } = await api.post("/auth/login", credentials);
            setToken(data.accessToken);
            setUserStorage(data.user);  // (func) set user in localstorage 
            setUser(data.user); // state
            toast.success(data.message);
            navigate("/", { replace: true });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    const signup = async (credentials) => {
        try {
            const { data } = await api.post("/auth/signup", credentials);
            setEmail(credentials.email);
            toast.success(data.message);
            navigate("/verify-otp");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Signup failed"
            );
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Backend logout failed or was already cleared:");
        } finally {
            removeToken();
            removeUser();
            setUser(null);
            toast.success("Logged out successfully.")
            navigate("/login");
        }
    }

    const requestForgotPassword = async (userEmail) => {
        try {
            const { data } = await api.post("/auth/forgot-password-request", { email: userEmail });
            setEmail(userEmail); 
            toast.success(data.message);
            navigate("/forgot-password-verify");
        } catch (error) {
            toast.error(
                error.response?.data?.message || 
                "Failed to send reset OTP"
            );
        }
    };

    const verifyForgotPassword = async (payload) => {
        try {
            const { data } = await api.post("/auth/forgot-password-verify", payload);
            toast.success(data.message);
            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message || 
                "Password reset failed"
            );
        }
    };

    const value = useMemo(() => ({
        user,
        email,
        setEmail,
        login,
        signup,
        logout, 
        requestForgotPassword, 
        verifyForgotPassword
    }), [user, email]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};