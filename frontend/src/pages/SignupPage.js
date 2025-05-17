import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/users/signup/', {
        username,
        email,
        password,
      });

      alert('Account successfully created! Redirecting to login...');
      navigate('/login');
    } catch (error) {
      const data = error.response?.data;
      let errorMessage = 'Error on the register. Try again.';

      if (typeof data === 'string') {
        errorMessage = data;
      } else if (data?.error) {
        errorMessage = data.error;
      } else if (data?.username) {
        errorMessage = 'Username: ' + data.username[0];
      } else if (data?.email) {
        errorMessage = 'Email: ' + data.email[0];
      }

      alert(errorMessage);
    }
  };

  return (
    <div className="signup-page">
      <div className="member-benefits">
        <h3>BECOME A MEMBER 🔒</h3>
        <ul>
          <li>Access to MTNATION</li>
          <li>Invites to Exclusive Events</li>
          <li>Special Offers and Discounts</li>
          <li>Private Whatsapp Group</li>
          <li>Save your Favorite Sets</li>
        </ul>
      </div>  
      <h2>SIGNUP</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">REGISTER</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default SignupPage;
