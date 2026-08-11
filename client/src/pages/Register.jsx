import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { api } from '../utils/api';
import { setToken, setUser } from '../utils/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // API call to backend
      const res = await api.auth.register({ name, email, password });
      setToken(res.token);
      setUser(res.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="glass-card auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join Nayay Shala Legal Sahayak to automate your legal workflow</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <User className="input-icon" size={20} />
            <input 
              type="text" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

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
            {loading ? 'Creating Account...' : 'Register'} <ArrowRight size={20} />
          </button>
        </form>
        
        <Link to="/login" className="auth-link">
          Already have an account? Login here.
        </Link>
      </div>
    </div>
  );
};

export default Register;
