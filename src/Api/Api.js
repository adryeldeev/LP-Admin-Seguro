// src/Api/api.ts
import axios from "axios";
const getApi = (token) => {
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
export default getApi;
