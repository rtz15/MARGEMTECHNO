import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // null = loading | {} = authenticated | false = guest

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get('/users/me/', { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      setUser(false); // não autenticado
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
