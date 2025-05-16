import React, { useContext } from 'react';
import '../styles/ProfileSidebar.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';

function ProfileSidebar({ isOpen, onClose }) {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/users/logout/', { withCredentials: true });
      setUser(false);
      onClose();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className={`profile-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="profile-header">
        <h3 className="profile-title">My Account</h3>
        <button onClick={onClose} className="fechar-perfil">X</button>
      </div>

      <div className="profile-content">
        <button className="profile-button" onClick={() => { navigate('/perfil'); onClose(); }}>
          View Profile
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileSidebar;
