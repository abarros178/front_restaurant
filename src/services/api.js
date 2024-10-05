import axios from 'axios';

// Crear una función para crear una instancia de axios con configuración común
const createApiInstance = (baseURL) => {
  const api = axios.create({
    baseURL, // Asigna la baseURL proporcionada
    timeout: 5000,
  });

  // Interceptor para agregar el token automáticamente
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor para manejar respuestas
  api.interceptors.response.use(
    (response) => {
      // Solo devolver el data de la respuesta
      return response.data; // Devuelve solo el `data` de la respuesta
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error.response ? error.response.data : new Error('API request failed'));
    }
  );

  return api; // Devuelve la instancia de Axios
};

export default createApiInstance; // Exporta la función
