import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', email, password);
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        <p className="signup-text">
          Ainda não tens uma conta? <Link to="/signup">Sign up aqui</Link>
        </p>
      </form>

      <div className="divider">
        <span className="line"></span>
        <span className="or">ACCESS QUICKLY</span>
        <span className="line"></span>
      </div>

      <div className="oauth-buttons">
        <button className="oauth-btn google">
          <img src="/icons/google-icon.svg" alt="Google" /> Google
        </button>
        <button className="oauth-btn microsoft">
          <img src="/icons/microsoft-icon.svg" alt="Microsoft" /> Microsoft
        </button>
        <button className="oauth-btn apple">
          <img src="/icons/apple-icon.svg" alt="Apple" /> Apple
        </button>
      </div>
    </div>
  );
}

export default LoginPage;