import React, { useState, useEffect, useRef } from 'react';

const StatCounter = ({ end, label, icon: Icon, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    });
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div className="glass-card stat-card" ref={countRef}>
      {Icon && <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}><Icon size={32} /></div>}
      <div className="stat-number">{count}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCounter;
