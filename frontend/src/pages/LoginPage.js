import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../utils/auth'; // importa aqui
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        username: email,
        password: password,
      });

      const token = response.data.token;
      saveToken(token); // guarda o token no localStorage

      alert('Login completed!');
      navigate('/home'); // redireciona como já tinhas
    } catch (error) {
      alert('Error trying to sign in: ' + (error.response?.data?.non_field_errors || 'Unkown error'));
    }
  };

  return (
    <div className="login-page">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin} className="login-form">
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
        <button type="submit">LOGIN</button>
        <p className="login-link">
          Still don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
