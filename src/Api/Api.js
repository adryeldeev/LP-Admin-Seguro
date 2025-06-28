import axios from "axios";
import { useAuth } from "../Context/AuthProvider";
const useApi = () => {
    const { token } = useAuth(); // Agora o TypeScript sabe que 'token' existe
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    // Interceptor para adicionar o token
    api.interceptors.request.use((config) => {
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    return api;
};
export default useApi;
