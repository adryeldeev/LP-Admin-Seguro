// src/Api/api.ts
import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
const useApi = () => {
    const { token } = useAuth();
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    api.interceptors.request.use((config) => {
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    return api;
};
export default useApi;
