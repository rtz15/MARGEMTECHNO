import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Checkout from '../components/shop/Checkout';
import { AuthContext } from '../context/AuthContext';

function ShopCheckout() {
  const { user } = useContext(AuthContext);

  if (user === null) return <p>Loading...</p>;
  if (user === false) return <Navigate to="/login" replace />;

  return <Checkout />;
}

export default ShopCheckout;
