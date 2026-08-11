import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import { api } from '../utils/api';
import { marked } from 'marked';

const LegalQA = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello. I can answer general questions about Indian law, corporate compliance, and legal procedures. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e, customText = null) => {
    if (e) e.preventDefault();
    const text = customText || input;
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.ai.chat({ message: userMsg.content, history: messages, type: 'qa' });
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply || res.response || res.content }]);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'According to the **Indian Contract Act, 1872**, for a contract to be valid, there must be free consent, lawful consideration, and lawful object. However, please consult a qualified lawyer for specific advice regarding your situation.' 
        }]);
      }, 1500);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveDocument = async () => {
    try {
      const assistantMessages = messages.filter(m => m.role === 'assistant');
      const lastDraft = assistantMessages[assistantMessages.length - 1];
      const draftContent = marked.parse(lastDraft ? lastDraft.content : '');
        
      const res = await api.documents.create({
        title: 'Q&A Document',
        content: draftContent,
        status: 'draft'
      });
      navigate(`/documents/${res.id || res._id}`);
    } catch (err) {
      alert('Mock mode: Redirecting to dashboard...');
      navigate('/dashboard');
    }
  };

  const suggestions = [
    "What are the requirements for a valid NDA in India?",
    "How to register a Private Limited Company?",
    "What is the difference between Leave & License and Lease?"
  ];

  return (
    <div className="dashboard-layout fade-in">
      <Sidebar />
      <main className="chat-page" style={{ flex: 1, padding: 0 }}>
        <div className="chat-container">
          <div className="disclaimer-banner">
            <AlertTriangle size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
            <strong>Disclaimer:</strong> This AI assistant provides general information only and does not constitute formal legal advice.
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {isTyping && <ChatMessage isTyping={true} />}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', padding: '0 1.5rem 1rem' }}>
              {suggestions.map((s, i) => (
                <button 
                  key={i} 
                  className="filter-pill" 
                  style={{ fontSize: '0.85rem' }}
                  onClick={() => handleSend(null, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.length > 2 && !isTyping && (
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <button onClick={handleSaveDocument} className="btn btn-accent">
                <FileText size={18} /> Save as Document
              </button>
            </div>
          )}

          <div className="chat-input-area">
            <form className="chat-form" onSubmit={(e) => handleSend(e)}>
              <textarea
                className="chat-input"
                placeholder="Ask a legal question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                rows={2}
              />
              <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LegalQA;
