import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import TemplateWizard from './pages/TemplateWizard';
import DocumentEditor from './pages/DocumentEditor';
import AIChat from './pages/AIChat';
import LegalQA from './pages/LegalQA';
import Profile from './pages/Profile';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/templates" element={<Templates />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/templates/:id/wizard" element={<ProtectedRoute><TemplateWizard /></ProtectedRoute>} />
      <Route path="/documents/:id" element={<ProtectedRoute><DocumentEditor /></ProtectedRoute>} />
      <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
      <Route path="/legal-qa" element={<ProtectedRoute><LegalQA /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
