// services/orderService.js
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
