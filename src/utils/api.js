import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// her istege yetki jetonunu eklemek icin istek araya giricisi
api.interceptors.request.use(
  (config) => {
    const jeton = localStorage.getItem('jeton');
    if (jeton) {
      config.headers.Authorization = `Bearer ${jeton}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
