import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.5:8000',  // Update to IP for mobile
});

// Export functions with token injection (use useAuth in components)
export const todoAPI = (token) => ({
  create: (title) => api.post('/todos', { title }, { headers: { Authorization: `Bearer ${token}` } }),
  list: () => api.get('/todos', { headers: { Authorization: `Bearer ${token}` } }),
  update: (id, completed) => api.put(`/todos/${id}`, { completed }, { headers: { Authorization: `Bearer ${token}` } }),
});

export default api;