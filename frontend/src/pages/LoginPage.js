import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../styles/LoginPage.css';

const getCSRFToken = async () => {
  await axios.get('http://localhost:8000/api/users/csrf/', {
    withCredentials: true,
  });
};

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { fetchUser } = useContext(AuthContext); // ← importante

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await getCSRFToken(); // ← carrega o cookie CSRF

      await axios.post(
        'http://localhost:8000/api/users/login/',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            'X-CSRFToken': getCookie('csrftoken'),
          },
        }
      );

      await fetchUser(); // ← atualiza o estado global com os dados do user
      setTimeout(() => {
        alert('Login successful!');
        navigate('/');
      }, 100);
    } catch (error) {
      const errorData = error.response?.data;

      if (errorData?.non_field_errors) {
        alert('Login failed: ' + errorData.non_field_errors[0]);
      } else if (errorData?.detail) {
        alert('Login failed: ' + errorData.detail);
      } else {
        alert('Login failed: Unknown error.');
      }
    }
  };

  return (
    <div className="login-page">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
