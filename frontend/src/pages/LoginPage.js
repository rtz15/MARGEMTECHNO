import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login/', {
        email,
        password,
      });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      alert('Login bem-sucedido!');
      // Navegar para a homepage ou dashboard
      navigate('/');
    } catch (error) {
      alert('Credenciais inválidas.');
    }
  };

  return (
    <div className="login-page">
      <h2>LOGIN</h2>
      <form className="login-form" onSubmit={handleLogin}>
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
      </form>
      <p className="signup-link">
        Ainda não tens uma conta? <Link to="/signup">Sign up aqui</Link>
      </p>
    </div>
  );
}

export default LoginPage;
