import axios from "axios";
import { getToken, setToken, removeToken } from "../utils/token";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


// Attach access token to every request
api.interceptors.request.use(
    (config) => {

        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// Handle expired access tokens
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // Only handle 401 once
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                // Ask backend for a new access token
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                const newAccessToken = response.data.accessToken;

                // Save new access token
                setToken(newAccessToken);

                // Update original request
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                // Retry original request
                return api(originalRequest);

            } catch (refreshError) {

                console.error(
                    "Refresh token failed:",
                    refreshError
                );

                // Refresh token is invalid/expired
                removeToken();

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;