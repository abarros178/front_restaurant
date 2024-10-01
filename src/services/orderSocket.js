import createApiInstance from './api'; // Adjust the path if needed

const api = createApiInstance('http://localhost:3010/api'); // Adjust the base URL as necessary

export const fetchLatestOrders = async () => {
  try {
    const latestOrders = await api.get('/latest-orders');
    return latestOrders; // Return the fetched orders
  } catch (error) {
    throw new Error('Error fetching latest orders: ' + error.message);
  }
};
