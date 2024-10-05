import createApiInstance from './api'; // Importa la función para crear la instancia de Axios
import { API_BASE_URL_AUTH } from '../config';


// Función para iniciar sesión y obtener el token
export const loginUser = async (email, password) => {
  const api = createApiInstance(API_BASE_URL_AUTH); // Crear una instancia de Axios con la URL base definida
  try {
    const response = await api.post('/login', { email, password });  // Llama a la API de login

    // Verificar que la respuesta contiene el token
    if (!response || !response.data || !response.data.token) {
      throw new Error('No token returned from login');
    }

    const { token,username } = response.data;  // El token está en response.data.token
    // Guarda el token en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    return token;
  } catch (error) {
    // Aquí se utiliza el manejo de errores ya configurado en el interceptor
    throw new Error(error.message || 'An unexpected error occurred.'); // Mensaje de error genérico si no se obtiene uno
  }
};

export const logoutUser = async () => {
  const api = createApiInstance(API_BASE_URL_AUTH);
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await api.post('/logout', { token });
    }
  } catch (error) {
    console.error('Error during logout:', error);
    // Incluso si hay un error, procedemos con la limpieza local
  } finally {
    // Limpiamos el token y cualquier otro dato de sesión
    localStorage.removeItem('token');
    // Aquí podrías limpiar otros datos de sesión si los tienes
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};
