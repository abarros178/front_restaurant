import createApiInstance from './api';

const API_URL = 'http://localhost:3004/api/kitchen';

export const getRecipes = async () => {
  const api = createApiInstance(API_URL);

  try {
    const response = await api.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
