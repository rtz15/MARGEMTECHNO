import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      alert("Login efetuado com sucesso!");
    } catch (err) {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input type="text" placeholder="Username" value={username}
               onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
