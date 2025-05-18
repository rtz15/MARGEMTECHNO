import React, { useState, useContext } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/Checkout.css';
import { CartContext } from '../../context/CartContext';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  console.log("Checkout cartItems:", cartItems);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Carrinho vazio!');
      return;
    }

    const compras = cartItems.map(item => ({
      produto_id: item.id,
      preco: item.preco,
      quantidade: item.quantidade,
      data: new Date().toISOString()
    }));

    try {
      await axiosInstance.post(
        'checkout/',
        { compras, entrega: formData },
        {
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          }
        }
      );
      setMessage('Compra realizada com sucesso!');
      clearCart();
    } catch (error) {
      console.error(error);
      setMessage('Erro ao finalizar compra. Tenta novamente.');
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>FINISH PURCHASE</h2>

        {/* RESUMO DA COMPRA */}
        <div className="checkout-summary">
          <h3>Resumo da Compra</h3>
          {cartItems.length === 0 ? (
            <p>Carrinho vazio.</p>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  {item.nome} × {item.quantidade} — {(item.preco * item.quantidade).toFixed(2)} €
                </li>
              ))}
            </ul>
          )}
          <p><strong>Total:</strong> {total.toFixed(2)} €</p>
        </div>

        {/* FORMULÁRIO */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input name="zipCode" value={formData.zipCode} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
              <option value="">Select</option>
              <option>MB WAY</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>PayPal</option>
            </select>
          </div>

          <button type="submit" className="confirmar-compra">Confirm Purchase</button>
        </form>

        {message && <p className="checkout-message">{message}</p>}
      </div>
    </div>
  );
}

export default Checkout;
