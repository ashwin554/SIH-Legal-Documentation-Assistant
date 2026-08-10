import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Edit2, Download, Trash2, Clock } from 'lucide-react';

const DocumentCard = ({ document, onDelete }) => {
  const date = new Date(document.updated_at || document.created_at || Date.now()).toLocaleDateString();
  const status = document.status || 'draft';
  
  return (
    <div className="glass-card doc-card">
      <div className="doc-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
            <FileText size={20} color="var(--accent)" />
          </div>
          <div>
            <h3 className="doc-title">{document.title}</h3>
            <div className="doc-meta">
              <Clock size={14} /> Updated {date}
            </div>
          </div>
        </div>
        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <div className="doc-actions">
        <Link to={`/documents/${document.id || document._id}`} className="btn-icon" title="Edit">
          <Edit2 size={16} />
        </Link>
        <button className="btn-icon" title="Export PDF">
          <Download size={16} />
        </button>
        <button className="btn-icon" onClick={() => onDelete(document.id || document._id)} title="Delete" style={{ color: 'var(--danger)' }}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
