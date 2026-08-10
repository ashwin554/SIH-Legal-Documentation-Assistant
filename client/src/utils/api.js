const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const config = {
    headers: { 
      'Content-Type': 'application/json', 
      ...(token ? { Authorization: `Bearer ${token}` } : {}) 
    },
    ...options,
  };
  
  if (options.body && typeof options.body !== 'string') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/pdf')) return response.blob();
    return response.json();
  } catch (error) {
    throw error;
  }
}

export const api = {
  auth: {
    register: (data) => request('/auth/register', { method: 'POST', body: data }),
    login: (data) => request('/auth/login', { method: 'POST', body: data }),
    getProfile: () => request('/auth/profile'),
  },
  templates: {
    getAll: () => request('/templates'),
    getById: (id) => request(`/templates/${id}`),
  },
  documents: {
    getAll: () => request('/documents'),
    getById: (id) => request(`/documents/${id}`),
    create: (data) => request('/documents', { method: 'POST', body: data }),
    update: (id, data) => request(`/documents/${id}`, { method: 'PUT', body: data }),
    delete: (id) => request(`/documents/${id}`, { method: 'DELETE' }),
    exportPDF: (id) => request(`/documents/${id}/export/pdf`),
  },
  ai: {
    draft: (data) => request('/ai/draft', { method: 'POST', body: data }),
    review: (data) => request('/ai/review', { method: 'POST', body: data }),
    suggest: (data) => request('/ai/suggest', { method: 'POST', body: data }),
    chat: (data) => request('/ai/chat', { method: 'POST', body: data }),
    enhance: (data) => request('/ai/enhance', { method: 'POST', body: data }),
  },
};
