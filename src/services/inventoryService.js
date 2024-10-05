import createApiInstance from './api';
import { API_BASE_URL_INGREDI } from '../config';


export const getKitchenInventory = async () => {
    const api = createApiInstance(API_BASE_URL_INGREDI); // Create a new instance with the base URL
    try {
      const response = await api.get('/all'); // Fetch the latest order
      return response.data; // Return the latest order count
    } catch (error) {
      throw error; // Propagate the error to be handled in the component
    }
  };