import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/index.css';
import './styles/components.css';
import './styles/landing.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/templates.css';
import './styles/editor.css';
import './styles/chat.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
