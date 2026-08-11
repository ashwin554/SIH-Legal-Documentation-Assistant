import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { isAuthenticated, logout, getUser } from '../utils/auth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const auth = isAuthenticated();
  const user = getUser();

  return (
    <nav className={`navbar ${!isLanding || isScrolled ? 'solid' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="nav-brand">
          <span className="gradient-text">Nayay</span> Shala
        </Link>

        <div className={`nav-links ${isMobileOpen ? 'mobile-open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
          <Link to="/ai-chat">AI Draft</Link>
          <Link to="/legal-qa">Legal Q&A</Link>
        </div>

        <div className={`nav-auth ${isMobileOpen ? 'mobile-open' : ''}`}>
          {auth ? (
            <div className="user-menu" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
              <button onClick={logout} className="btn" style={{ border: '1px solid var(--danger)', color: 'var(--danger)' }}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn" style={{ color: 'var(--text-primary)' }}>Login</Link>
              <Link to="/register" className="btn btn-accent">Get Started</Link>
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)} style={{ display: 'none' }}>
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
