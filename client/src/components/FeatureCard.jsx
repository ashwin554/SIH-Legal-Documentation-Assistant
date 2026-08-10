import React from 'react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="glass-card feature-card slide-up">
      <div className="feature-icon">
        <Icon size={28} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
