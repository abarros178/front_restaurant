import createApiInstance from './api';
import { API_BASE_URL_MARKET } from '../config';


export const getPurchaseHistory = async (page = 0, limit = 10, sortBy = 'purchase_date', sortOrder = 'desc', searchTerm = '') => {
  const api = createApiInstance(API_BASE_URL_MARKET);

  try {
    const response = await api.get(`/historyPurchases`, {
      params: { 
        page: page + 1, 
        limit, 
        sortBy, 
        sortOrder,
        search: searchTerm // Añadimos el término de búsqueda
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    throw error;
  }
};