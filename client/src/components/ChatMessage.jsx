import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isTyping }) => {
  const isUser = message.role === 'user';
  
  if (isTyping) {
    return (
      <div className="message-wrapper assistant">
        <div className="message-avatar">
          <Bot size={20} color="#fff" />
        </div>
        <div className="message-bubble">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="message-avatar">
          <Bot size={20} color="#fff" />
        </div>
      )}
      <div className="message-bubble">
        <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
      </div>
      {isUser && (
        <div className="message-avatar" style={{ marginLeft: '1rem', marginRight: 0, background: 'var(--accent)' }}>
          <User size={20} color="#000" />
        </div>
      )}
    </div>
  );
};

// Very basic markdown formatter for bold and line breaks
function formatMessage(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
}

export default ChatMessage;
