import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Download, Bold, Italic, List, Heading, Bot } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('draft');
  const editorRef = useRef(null);

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    try {
      const res = await api.documents.getById(id);
      setDocument(res);
      setTitle(res.title);
      setStatus(res.status);
      if (editorRef.current) {
        editorRef.current.innerHTML = res.content;
      }
    } catch (err) {
      console.error(err);
      // Mock data for demo
      const mockDoc = { id, title: 'Draft Agreement', content: '<h1>Draft Agreement</h1><p>Start typing here...</p>', status: 'draft' };
      setDocument(mockDoc);
      setTitle(mockDoc.title);
      setStatus(mockDoc.status);
      setTimeout(() => {
        if (editorRef.current) editorRef.current.innerHTML = mockDoc.content;
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const content = editorRef.current.innerHTML;
      await api.documents.update(id, { title, content, status });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      const blob = await api.documents.exportPDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('PDF Export not available in demo mode');
    }
  };

  const execCommand = (cmd, arg = null) => {
    document.execCommand(cmd, false, arg);
    editorRef.current.focus();
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingSpinner /></div>;

  return (
    <div className="editor-layout fade-in">
      <div className="editor-main">
        <div className="editor-toolbar">
          <button onClick={() => navigate('/dashboard')} className="toolbar-btn" title="Back to Dashboard">
            <ArrowLeft size={20} />
          </button>
          
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="document-title-input"
          />

          <div className="toolbar-divider"></div>

          <button onClick={() => execCommand('bold')} className="toolbar-btn"><Bold size={18} /></button>
          <button onClick={() => execCommand('italic')} className="toolbar-btn"><Italic size={18} /></button>
          <button onClick={() => execCommand('insertUnorderedList')} className="toolbar-btn"><List size={18} /></button>
          <button onClick={() => execCommand('formatBlock', 'H2')} className="toolbar-btn"><Heading size={18} /></button>

          <div style={{ flex: 1 }}></div>

          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #e2e8f0', background: '#fff' }}
          >
            <option value="draft">Draft</option>
            <option value="review">In Review</option>
            <option value="final">Final</option>
          </select>

          <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} disabled={saving}>
            <Save size={18} /> {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={handleExportPDF} className="btn" style={{ padding: '0.5rem 1rem', background: '#f1f5f9', color: '#0f172a' }}>
            <Download size={18} /> Export
          </button>
        </div>

        <div className="editor-content-area">
          <div 
            className="document-page"
            contentEditable
            ref={editorRef}
            suppressContentEditableWarning={true}
          >
          </div>
        </div>
      </div>

      <aside className="editor-sidebar">
        <div className="sidebar-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot size={20} color="var(--accent)" /> AI Suggestions
          </h3>
        </div>
        <div className="sidebar-content">
          <div className="ai-suggestion-card">
            <p><strong>Enhance clause</strong></p>
            <p style={{ color: 'var(--text-secondary)' }}>The confidentiality clause could be made more specific regarding digital assets.</p>
            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Apply</button>
          </div>
          <div className="ai-suggestion-card">
            <p><strong>Missing Jurisdiction</strong></p>
            <p style={{ color: 'var(--text-secondary)' }}>You have not specified the governing law for this contract.</p>
            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Fix</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DocumentEditor;
