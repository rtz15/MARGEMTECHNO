import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignupPage.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As palavras-passe não coincidem.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/users/signup/', {
        email,
        password,
      });
      alert('Registo bem-sucedido! Já podes iniciar sessão.');
    } catch (error) {
      alert('Erro no registo. Tenta novamente.');
    }
  };

  return (
    <div className="signup-page">
      <h2>SIGNUP</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar palavra-passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">REGISTAR</button>
      </form>
      <p className="login-link">
        Já tens uma conta? <Link to="/login">Inicia sessão aqui</Link>
      </p>
    </div>
  );
}

export default SignupPage;