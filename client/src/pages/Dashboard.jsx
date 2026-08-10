import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, CheckCircle, Clock } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DocumentCard from '../components/DocumentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';
import { getUser } from '../utils/auth';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await api.documents.getAll();
      setDocuments(res.documents || []);
    } catch (err) {
      console.error(err);
      // Fallback for demo if api fails
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await api.documents.delete(id);
        setDocuments(documents.filter(doc => doc.id !== id && doc._id !== id));
      } catch (err) {
        alert('Failed to delete document');
      }
    }
  };

  const drafts = documents.filter(d => d.status === 'draft').length;
  const inReview = documents.filter(d => d.status === 'review').length;
  const final = documents.filter(d => d.status === 'final').length;

  return (
    <div className="dashboard-layout fade-in">
      <Sidebar />
      <main className="dashboard-main">
        <div className="welcome-banner">
          <h1>Welcome back, {user?.name || 'User'}</h1>
          <p>Here is an overview of your legal documents.</p>
        </div>

        <div className="dashboard-stats">
          <div className="glass-card stat-box">
            <div className="stat-icon" style={{ color: 'var(--accent)' }}><FileText /></div>
            <div className="stat-info">
              <h4>Total Docs</h4>
              <div className="value">{documents.length}</div>
            </div>
          </div>
          <div className="glass-card stat-box">
            <div className="stat-icon" style={{ color: 'var(--warning)' }}><Clock /></div>
            <div className="stat-info">
              <h4>Drafts</h4>
              <div className="value">{drafts}</div>
            </div>
          </div>
          <div className="glass-card stat-box">
            <div className="stat-icon" style={{ color: '#38bdf8' }}><FileText /></div>
            <div className="stat-info">
              <h4>In Review</h4>
              <div className="value">{inReview}</div>
            </div>
          </div>
          <div className="glass-card stat-box">
            <div className="stat-icon" style={{ color: 'var(--success)' }}><CheckCircle /></div>
            <div className="stat-info">
              <h4>Final</h4>
              <div className="value">{final}</div>
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2>Recent Documents</h2>
          <Link to="/templates" className="btn btn-primary">
            <Plus size={18} /> New Document
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : documents.length > 0 ? (
          <div className="docs-grid">
            {documents.map(doc => (
              <DocumentCard key={doc.id || doc._id} document={doc} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
            <FileText size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
            <h3>No documents found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>You haven't created any legal documents yet.</p>
            <Link to="/templates" className="btn btn-accent">Create Your First Document</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
