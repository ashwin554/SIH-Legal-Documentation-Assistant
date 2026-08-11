import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';
import { marked } from 'marked';

const TemplateWizard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    api.templates.getById(id).then(res => {
      const step1Fields = res.fields.slice(0, Math.ceil(res.fields.length / 2));
      const step2Fields = res.fields.slice(Math.ceil(res.fields.length / 2));
      
      setTemplate({
        ...res,
        steps: [
          { title: 'Primary Details', fields: step1Fields },
          { title: 'Additional Details', fields: step2Fields }
        ]
      });
      setLoading(false);
    }).catch(err => {
      console.error(err);
      navigate('/templates');
    });
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
      let draftText = template.template;
      // replace all placeholders like {{field_name}}
      Object.keys(formData).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        draftText = draftText.replace(regex, formData[key] || `[${key}]`);
      });
      
      const htmlContent = marked.parse(draftText);
      
      const res = await api.documents.create({
        title: `${template.name} - Draft`,
        content: htmlContent,
        template_id: id,
        status: 'draft'
      });
      
      navigate(`/documents/${res.id || res._id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to generate document.');
      navigate('/dashboard'); 
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
