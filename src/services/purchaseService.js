import createApiInstance from './api';

const API_URL = 'http://localhost:3006/api/marketplace';

export const getPurchaseHistory = async (page = 0, limit = 10, sortBy = 'purchase_date', sortOrder = 'desc', searchTerm = '') => {
  const api = createApiInstance(API_URL);

  try {
    const response = await api.get(`${API_URL}/historyPurchases`, {
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