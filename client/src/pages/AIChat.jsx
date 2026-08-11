import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import { api } from '../utils/api';
import { marked } from 'marked';

const AIChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Legal Drafting Assistant. What kind of document would you like to draft today? You can describe it in plain English.' }
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

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Pass history to AI
      const res = await api.ai.chat({ message: userMsg.content, history: messages });
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply || res.response || res.content }]);
    } catch (err) {
      console.error(err);
      // Fallback response for demo
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'I understand. Based on your requirements, I have drafted the document. Would you like me to save it to your workspace so you can review and edit it?' 
        }]);
      }, 1500);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveDocument = async () => {
    try {
      const draftContent = messages
        .filter(m => m.role === 'assistant')
        .map(m => marked.parse(m.content))
        .join('<hr/>');
        
      const res = await api.documents.create({
        title: 'AI Drafted Document',
        content: draftContent,
        status: 'draft'
      });
      navigate(`/documents/${res.id || res._id}`);
    } catch (err) {
      alert('Mock mode: Redirecting to dashboard...');
      navigate('/dashboard');
    }
  };

  return (
    <div className="dashboard-layout fade-in">
      <Sidebar />
      <main className="chat-page" style={{ flex: 1, padding: 0 }}>
        <div className="chat-container">
          <div className="chat-header">
            <h2>AI Document Drafter</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Describe your legal needs in plain language</p>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {isTyping && <ChatMessage isTyping={true} />}
            <div ref={messagesEndRef} />
          </div>

          {messages.length > 2 && !isTyping && (
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <button onClick={handleSaveDocument} className="btn btn-accent">
                <FileText size={18} /> Save as Document
              </button>
            </div>
          )}

          <div className="chat-input-area">
            <form className="chat-form" onSubmit={handleSend}>
              <textarea
                className="chat-input"
                placeholder="E.g., I need a rental agreement for my apartment in Mumbai for 11 months..."
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

export default AIChat;
