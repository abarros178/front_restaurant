import createApiInstance from './api'; // Import the function to create the Axios instance

const BASE_URL = 'http://localhost:3001/api'; // Set the base URL for your API


export const getLatestOrderCount = async () => {
  const api = createApiInstance(BASE_URL); // Create a new instance with the base URL
  try {
    const response = await api.get('/orders/latest'); // Fetch the latest order
    return response.data.id; // Return the latest order count
  } catch (error) {
    throw error; // Propagate the error to be handled in the component
  }
};

export const getOrders = async (page = 1, limit = 10, sortBy = 'created_at', sortOrder = 'desc', searchTerm = '') => {
  const api = createApiInstance(BASE_URL); // Crear una nueva instancia con la URL base

  try {
    const response = await api.get(`/orders`, {
      params: { page, limit, sortBy, sortOrder, search:searchTerm } // Agregar searchTerm como un parámetro de consulta
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderDetails = async (orderId) => {
  const api = createApiInstance(BASE_URL); // Create a new instance with the base URL
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};