import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';

const TemplateWizard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [generating, setGenerating] = useState(false);

  // Mock template data for the wizard
  useEffect(() => {
    // In a real app, fetch template by ID:
    // api.templates.getById(id).then(res => setTemplate(res.template));
    
    // Using mock for demo
    setTimeout(() => {
      setTemplate({
        id,
        name: 'Non-Disclosure Agreement',
        steps: [
          {
            title: 'Party Details',
            fields: [
              { name: 'party1Name', label: 'Disclosing Party Name', type: 'text', placeholder: 'e.g. Acme Corp' },
              { name: 'party2Name', label: 'Receiving Party Name', type: 'text', placeholder: 'e.g. Jane Doe' }
            ]
          },
          {
            title: 'Agreement Terms',
            fields: [
              { name: 'jurisdiction', label: 'Jurisdiction (State)', type: 'text', placeholder: 'e.g. Maharashtra' },
              { name: 'duration', label: 'Duration of Confidentiality (Years)', type: 'number', placeholder: 'e.g. 2' }
            ]
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < template.steps.length) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      // Send data to AI backend to generate doc
      const prompt = `Generate a ${template.name} with these details: ${JSON.stringify(formData)}`;
      
      // We will create the document first
      const draftContent = `<h1>${template.name}</h1><p>This is an AI drafted document based on: ${JSON.stringify(formData)}</p><p>Edit this draft in the editor.</p>`;
      
      const res = await api.documents.create({
        title: `${template.name} - ${formData.party1Name || 'Draft'}`,
        content: draftContent,
        template_id: id,
        status: 'draft'
      });
      
      // Navigate to editor
      navigate(`/documents/${res.document.id || res.document._id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate document. Mock mode continuing...');
      navigate('/dashboard'); // Fallback
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="dashboard-layout"><Sidebar /><main className="dashboard-main"><LoadingSpinner /></main></div>;

  return (
    <div className="dashboard-layout fade-in">
      <Sidebar />
      <main className="dashboard-main">
        <div className="wizard-container">
          <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create: {template.name}</h1>
          
          <div className="wizard-progress">
            {template.steps.map((s, idx) => (
              <div key={idx} className={`step-indicator ${step >= idx + 1 ? 'active' : ''}`}>
                {idx + 1}
              </div>
            ))}
          </div>
          
          <div className="wizard-step-content glass-card">
            <h2 style={{ marginBottom: '1.5rem' }}>{template.steps[step-1].title}</h2>
            
            <div className="auth-form">
              {template.steps[step-1].fields.map(field => (
                <div className="form-group" key={field.name}>
                  <label>{field.label}</label>
                  <input 
                    type={field.type} 
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    style={{ paddingLeft: '1rem' }} // override auth.css icon padding
                  />
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button className="btn" onClick={handleBack} disabled={step === 1} style={{ background: 'rgba(255,255,255,0.1)' }}>
                Back
              </button>
              
              {step < template.steps.length ? (
                <button className="btn btn-primary" onClick={handleNext}>Next Step</button>
              ) : (
                <button className="btn btn-accent" onClick={handleGenerate} disabled={generating}>
                  {generating ? 'Generating AI Draft...' : 'Generate Document'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateWizard;
