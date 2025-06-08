import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const ADMIN_EMAIL = 'admin@gmail.com'; // Set your admin email here
const ADMIN_PASSWORD = 'admin123'; // Set your admin password here

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      navigate('/admin');
      return;
    }
    // Member login
    try {
      const res = await fetch('http://localhost:5000/api/members');
      const members = await res.json();
      const foundMember = members.find(m => m.email === email && m.password === password);
      if (foundMember) {
        localStorage.setItem('member', JSON.stringify({ name: foundMember.memberName, email: foundMember.email }));
        navigate('/team-member/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>
          <Link to="/signup">Login as a member</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
