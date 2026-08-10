import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { api } from '../utils/api';
import { setToken, setUser } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // API call to backend
      const res = await api.auth.login({ email, password });
      setToken(res.token);
      setUser(res.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="glass-card auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to access your legal documents</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-accent auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'} <ArrowRight size={20} />
          </button>
        </form>
        
        <Link to="/register" className="auth-link">
          Don't have an account? Register here.
        </Link>
      </div>
    </div>
  );
};

export default Login;
