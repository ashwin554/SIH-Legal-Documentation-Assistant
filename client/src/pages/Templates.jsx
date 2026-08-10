import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TemplateCard from '../components/TemplateCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';

const CATEGORIES = ['All', 'Business', 'Property', 'Personal', 'Corporate'];

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await api.templates.getAll();
      setTemplates(res.templates || []);
    } catch (err) {
      console.error(err);
      // Mock data for demo
      setTemplates([
        { id: '1', name: 'Non-Disclosure Agreement', category: 'Business', description: 'Standard mutual NDA for protecting confidential information.' },
        { id: '2', name: 'Rental Agreement', category: 'Property', description: 'Standard residential lease agreement for renting property.' },
        { id: '3', name: 'Employment Contract', category: 'Corporate', description: 'Full-time employment agreement with standard clauses.' },
        { id: '4', name: 'Power of Attorney', category: 'Personal', description: 'Legal document to appoint someone to manage your affairs.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard-layout fade-in">
      <Sidebar />
      <main className="dashboard-main" style={{ padding: '0' }}>
        <div className="templates-page container">
          <div className="templates-header">
            <h1>Legal Templates</h1>
            <p>Choose from our library of lawyer-approved, AI-powered templates to draft your document in minutes.</p>
            
            <div className="search-bar">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search templates (e.g., Non-Disclosure Agreement)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="categories-filter">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner text="Loading templates..." />
          ) : (
            <div className="templates-grid">
              {filteredTemplates.map(template => (
                <TemplateCard key={template.id || template._id} template={template} />
              ))}
              {filteredTemplates.length === 0 && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>No templates found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Templates;
