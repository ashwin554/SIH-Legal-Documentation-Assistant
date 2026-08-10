import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Zap, Search, Globe, Scale } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCounter from '../components/StatCounter';
import FeatureCard from '../components/FeatureCard';

const Landing = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-shapes">
          {/* Add some animated SVG shapes or background glow here */}
        </div>
        <div className="container hero-content fade-in">
          <h1 className="hero-title">
            <span className="gradient-text">AI-Powered</span> Legal Documentation for India
          </h1>
          <p className="hero-subtitle">
            Draft, review, and manage your legal documents in minutes. 
            Smart templates compliant with Indian laws, powered by advanced AI.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn-accent btn-lg">Get Started Free</Link>
            <Link to="/templates" className="btn btn-secondary btn-lg glass-card" style={{ background: 'rgba(255,255,255,0.1)' }}>Explore Templates</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <StatCounter end={50} label="Legal Templates" />
            <StatCounter end={1000} label="Documents Generated" />
            <StatCounter end={99} label="Accuracy (%)" />
            <StatCounter end={24} label="24/7 AI Assistance" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose <span className="gradient-text">NyayaSahayak</span></h2>
          <div className="features-grid">
            <FeatureCard 
              icon={FileText} 
              title="Smart Templates" 
              description="Access a wide library of dynamic legal templates compliant with Indian laws. Just fill a form and generate." 
            />
            <FeatureCard 
              icon={Zap} 
              title="AI Document Drafting" 
              description="Describe your requirements in plain English, and our AI will draft the legal document for you instantly." 
            />
            <FeatureCard 
              icon={Search} 
              title="Legal Q&A" 
              description="Have legal questions? Ask our AI assistant trained on Indian Penal Code and corporate laws." 
            />
            <FeatureCard 
              icon={Shield} 
              title="100% Secure & Private" 
              description="Your data is encrypted. We do not store your sensitive legal documents beyond your session needs." 
            />
            <FeatureCard 
              icon={Globe} 
              title="Multi-lingual Support" 
              description="Draft and translate legal documents in multiple Indian languages effortlessly." 
            />
            <FeatureCard 
              icon={Scale} 
              title="Compliance Checked" 
              description="Documents are reviewed by AI to ensure they meet standard legal compliance in India." 
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="features-section" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', textAlign: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>1</div>
              <h3>Choose Template</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Select from our wide library of legal templates.</p>
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>2</div>
              <h3>Fill Details</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Answer a few simple questions in plain English.</p>
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1rem' }}>3</div>
              <h3>Get Document</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Download your formatted, ready-to-use legal document.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
