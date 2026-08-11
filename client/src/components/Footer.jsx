import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="nav-brand" style={{ marginBottom: '1rem' }}><span className="gradient-text">Nayay Shala</span> Legal Sahayak</h3>
            <p style={{ color: 'var(--text-secondary)' }}>AI-Powered Legal Documentation Assistant for everyone.</p>
          </div>
          <div className="footer-col">
            <h4>Features</h4>
            <ul>
              <li><Link to="/templates">Smart Templates</Link></li>
              <li><Link to="/ai-chat">AI Document Drafting</Link></li>
              <li><Link to="/legal-qa">Legal Q&A</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="#">Terms of Service</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Cookie Policy</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><Link to="#">Twitter</Link></li>
              <li><Link to="#">LinkedIn</Link></li>
              <li><Link to="#">GitHub</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Disclaimer: Nayay Shala Legal Sahayak is an AI assistant and does not provide formal legal advice. Always consult with a qualified professional for complex legal matters.</p>
          <p style={{ marginTop: '1rem' }}>&copy; {new Date().getFullYear()} Nayay Shala Legal Sahayak. Made for SIH 2024.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
