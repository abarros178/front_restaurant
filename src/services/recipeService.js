import createApiInstance from './api';
import { API_BASE_URL_KITCHEN } from '../config';


export const getRecipes = async () => {
  const api = createApiInstance(API_BASE_URL_KITCHEN);
  try {
    const response = await api.get(`/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};
