import axios from 'axios';

// Creamos una instancia de Axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api' // URL base de tu API
});

// 1. Configurar el INTERCEPTOR
// Esto se ejecuta ANTES de que CUALQUIER petición (get, post, etc.) se envíe
api.interceptors.request.use(
    (config) => {
        // 2. Obtener el token de localStorage
        const token = localStorage.getItem('authToken');
        
        // 3. Si el token existe, añadirlo a la cabecera 'Authorization'
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // Manejar errores de la petición
        return Promise.reject(error);
    }
);

export default api;