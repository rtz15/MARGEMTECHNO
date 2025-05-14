import axios from 'axios';
import { getToken } from './auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Interceptor para incluir o token automaticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
