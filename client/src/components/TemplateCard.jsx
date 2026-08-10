import React from 'react';
import { Link } from 'react-router-dom';
import { FileSignature } from 'lucide-react';

const TemplateCard = ({ template }) => {
  return (
    <div className="glass-card template-card">
      <div className="template-icon">
        <FileSignature size={32} />
      </div>
      <span className="template-badge">{template.category || 'General'}</span>
      <h3>{template.name}</h3>
      <p className="template-desc">{template.description}</p>
      
      <Link to={`/templates/${template.id || template._id}/wizard`} className="btn btn-primary" style={{ width: '100%' }}>
        Use Template
      </Link>
    </div>
  );
};

export default TemplateCard;
