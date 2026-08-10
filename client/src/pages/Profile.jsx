import React, { useState } from 'react';
import { User, Mail, Shield } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getUser, logout } from '../utils/auth';

const Profile = () => {
  const user = getUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile update functionality would save data to API here.');
  };

  return (
    <div className="dashboard-layout fade-in">
      <Sidebar />
      <main className="dashboard-main">
        <div className="welcome-banner">
          <h1>Account Settings</h1>
          <p>Manage your profile and preferences.</p>
        </div>

        <div className="container" style={{ maxWidth: '800px', margin: '0' }}>
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User color="var(--accent)" /> Personal Information
            </h2>
            
            <form className="auth-form" onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
              <div className="form-group">
                <label>Full Name</label>
                <User className="input-icon" size={20} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ paddingLeft: '3rem' }}
                />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <Mail className="input-icon" size={20} />
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  style={{ opacity: 0.7, paddingLeft: '3rem' }}
                  title="Email cannot be changed"
                />
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: 'fit-content' }}>
                Save Changes
              </button>
            </form>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield color="var(--danger)" /> Security & Data
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              We take your privacy seriously. Your documents are encrypted and safe.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary">Change Password</button>
              <button onClick={logout} className="btn" style={{ border: '1px solid var(--danger)', color: 'var(--danger)' }}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
