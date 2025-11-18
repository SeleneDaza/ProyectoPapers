// Ejemplo de api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Ajusta si es diferente
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Asegúrate que 'jwtToken' sea la clave correcta
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;