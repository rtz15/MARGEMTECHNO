import axios from 'axios';
import { getToken } from './auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true,  // 👈 necessário para enviar cookies de sessão e CSRF
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para enviar o token, se estiveres a usar TokenAuth (caso mistures)
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
