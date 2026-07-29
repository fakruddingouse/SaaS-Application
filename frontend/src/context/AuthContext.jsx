import { createContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { getUser, setUserStorage, getToken, setToken, removeToken } from "../utils/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(getUser());
    const [email, setEmail] = useState("");

    const login = async (credentials) => {
        try {
            const { data } = await api.post("/login", credentials);
            setToken(data.accessToken);
            setUserStorage(data.user);
            setUser(data.user);
            toast.success(data.message);
            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    const signup = async (credentials) => {
        try {
            const { data } = await api.post("/signup", credentials);
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

    const logout = () => {
        removeToken();
        setUser(null);
        toast.success("Logged out");
        navigate("/login");

    };

    const value = useMemo(() => ({
        user,
        email,
        setEmail,
        login,
        signup,
        logout, 
    }), [user, email]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

};