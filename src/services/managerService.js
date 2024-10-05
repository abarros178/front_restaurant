import createApiInstance from './api'; // Import the function to create the Axios instance
import { API_BASE_URL_MANAGER } from '../config';




export const createOrder = async () => {
  const api = createApiInstance(API_BASE_URL_MANAGER); // Create a new instance with the base URL
  try {
    const response = await api.get('/orders'); // Fetch the latest order
    return response.data.id; // Return the latest order count
  } catch (error) {
    throw error; // Propagate the error to be handled in the component
  }
};
