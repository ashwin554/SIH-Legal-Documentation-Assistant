import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Download, Bold, Italic, List, Heading, Bot } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { api } from '../utils/api';
import { marked } from 'marked';
import html2pdf from 'html2pdf.js';

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('draft');
  const [aiReview, setAiReview] = useState('');
  const [reviewing, setReviewing] = useState(false);
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

  const handleExportPDF = () => {
    try {
      const element = editorRef.current;
      const opt = {
        margin:       15,
        filename:     `${title || 'Document'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf().from(element).set(opt).save();
    } catch (err) {
      alert('PDF Export failed');
    }
  };

  const execCommand = (cmd, arg = null) => {
    window.document.execCommand(cmd, false, arg);
    editorRef.current.focus();
  };

  const handleReview = async () => {
    setReviewing(true);
    try {
      const content = editorRef.current.innerText || editorRef.current.textContent;
      const res = await api.ai.review({ content });
      setAiReview(res.suggestions);
    } catch (err) {
      console.error(err);
      alert('Failed to review document.');
    } finally {
      setReviewing(false);
    }
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
          {!aiReview ? (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Get AI-powered review of your document to identify missing clauses and risks.</p>
              <button onClick={handleReview} className="btn btn-accent" disabled={reviewing}>
                {reviewing ? 'Analyzing...' : 'Analyze Document'}
              </button>
            </div>
          ) : (
            <div className="ai-suggestion-card markdown-body" style={{ background: 'transparent', padding: 0 }} dangerouslySetInnerHTML={{ __html: marked.parse(aiReview) }} />
          )}
        </div>
      </aside>
    </div>
  );
};

export default DocumentEditor;
