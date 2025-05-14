import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { saveToken } from '../utils/auth'; // importa aqui também
import './SignupPage.css';

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
    // 1. Registo
    await axios.post('http://localhost:8000/api/users/signup/', {
      username,
      email,
      password,
    });

    // 2. Login automático após registo
    const loginRes = await axios.post('http://localhost:8000/api/users/login/', {
      username,
      password,
    });

    const token = loginRes.data.token;
    saveToken(token);

    alert('Account successfully created! You are signed in.');
    navigate('/home'); // ou redireciona onde quiseres
  } catch (error) {
    alert(error.response?.data?.error || 'Error on the register. Try again.');
  }
};

  return (
    <div className="signup-page">
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
        Already have an account? <Link to="/login">Sign in here</Link>
      </p>
    </div>
  );
}

export default SignupPage;