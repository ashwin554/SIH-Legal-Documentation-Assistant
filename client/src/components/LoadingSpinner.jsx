import React from 'react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
