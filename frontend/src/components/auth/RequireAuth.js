import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);

  if (user === null) return <p>Loading...</p>;       // em verificação
  if (user === false) return <Navigate to="/login" replace />;

  return children;
}

export default RequireAuth;