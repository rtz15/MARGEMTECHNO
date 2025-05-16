import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/ViewProfile.css';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

function ViewProfile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/users/logout/', { withCredentials: true });
      setUser(false);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const formattedDate = user?.date_joined
    ? new Date(user.date_joined).toLocaleString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="view-profile">
      <h2>My Profile</h2>

      <div className="profile-box">
        <p><strong>User:</strong> #{user?.id}</p>
      </div>

      <div className="profile-box">
        <p><strong>Username:</strong> {user?.username}</p>
      </div>

      <div className="profile-box">
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <div className="profile-box">
        <p><strong>Created:</strong> {formattedDate}</p>
      </div>

      <div className="profile-logout">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default ViewProfile;
