import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MTNationFeed from '../features/mtnation/MTNationFeed';

function MTNation() {
  const { user } = useContext(AuthContext);

  if (user === null) return <p>Loading...</p>;
  if (user === false) return <Navigate to="/login" replace />;

  return (
    <div className="mtnation-page">
      <MTNationFeed />
    </div>
  );
}

export default MTNation;
