import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Passes username and password to our global auth context system
      await login(username, password);
      // Moves you straight to your personal contacts list upon success
      navigate('/contacts');
    } catch (err) {
      alert('Invalid username or password credentials.');
    }
  };

  return (
    <div style={{ maxWidth: '320px', margin: '120px auto', fontFamily: 'sans-serif' }}>
      <div style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: '20px' }}>🔒 Secure Sign In</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Username</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
              style={{ width: '92%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{ width: '92%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
