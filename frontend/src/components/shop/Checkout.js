import React from 'react';
import '../../styles/Checkout.css';

function Checkout() {
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2>FINISH PURCHASE</h2>

        <form className="checkout-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Dj Pernas Mourinho Hernesto" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="exemplo@email.com" required />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="912345678" required />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Rua das Flores, nº 1234" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="Margem Sul" required />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input type="text" placeholder="1000-001" required />
            </div>
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select required>
              <option value="">Select</option>
              <option>MB WAY</option>
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>PayPal</option>
            </select>
          </div>

          <button type="submit" className="confirmar-compra">Confirm Purchase</button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;