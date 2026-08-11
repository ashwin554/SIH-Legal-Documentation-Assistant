import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, LayoutTemplate, Bot, MessageSquare, User, LogOut } from 'lucide-react';
import { logout, getUser } from '../utils/auth';

const Sidebar = () => {
  const user = getUser();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="gradient-text">Nayay</span> Shala
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/templates" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LayoutTemplate size={20} /> Templates
        </NavLink>
        <NavLink to="/ai-chat" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Bot size={20} /> AI Draft
        </NavLink>
        <NavLink to="/legal-qa" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <MessageSquare size={20} /> Legal Q&A
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <User size={20} /> Profile
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <p style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.name || 'User'}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user?.email}</p>
        </div>
        <button onClick={logout} className="btn-icon" title="Logout" style={{ color: 'var(--danger)' }}>
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
