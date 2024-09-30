import createApiInstance from './api'; // Importa la función para crear la instancia de Axios

// Definir la variable para la base URL
const BASE_URL = 'http://localhost:3003/auth-service/api'; // Cambia esto según tu entorno

// Función para iniciar sesión y obtener el token
export const loginUser = async (email, password) => {
  const api = createApiInstance(BASE_URL); // Crear una instancia de Axios con la URL base definida
  try {
    const response = await api.post('/login', { email, password });  // Llama a la API de login

    // Verificar que la respuesta contiene el token
    if (!response || !response.data || !response.data.token) {
      throw new Error('No token returned from login');
    }

    const { token } = response.data;  // El token está en response.data.token
    // Guarda el token en localStorage
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    // Aquí se utiliza el manejo de errores ya configurado en el interceptor
    throw new Error(error.message || 'An unexpected error occurred.'); // Mensaje de error genérico si no se obtiene uno
  }
};

// Función para cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem('token');  // Eliminar el token del localStorage
};

// Función para obtener el token desde localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};
