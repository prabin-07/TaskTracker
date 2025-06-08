import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    fetch('http://localhost:5000/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberName: name,
        email,
        password,
        role: 'member',
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Signup failed');
        return res.json();
      })
      .then((data) => {
        setSuccess('Signup successful! Redirecting to dashboard...');
        localStorage.setItem('member', JSON.stringify({ name: data.memberName, email: data.email }));
        setTimeout(() => navigate('/team-member/dashboard'), 1500);
      })
      .catch(() => setError('Signup failed. Email may already be in use.'));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Member Signup</h2>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
        <button type="submit">Signup</button>
        <p style={{ textAlign: 'right' }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup; 