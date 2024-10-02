import createApiInstance from './api';

const API_URL = 'http://localhost:3008/api/ingredients';

export const getKitchenInventory = async () => {
    const api = createApiInstance(API_URL); // Create a new instance with the base URL
    try {
      const response = await api.get('/all'); // Fetch the latest order
      return response.data; // Return the latest order count
    } catch (error) {
      throw error; // Propagate the error to be handled in the component
    }
  };