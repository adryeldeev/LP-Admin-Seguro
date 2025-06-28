// src/Api/api.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

 const getApi = (token?: string): AxiosInstance => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export default getApi