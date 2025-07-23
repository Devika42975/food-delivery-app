import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is due to backend server not running
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.code === 'ECONNREFUSED') {
      console.warn('Backend server appears to be offline. Using mock data instead.');
      
      // Return a resolved promise with mock data structure
      // The actual mock data will be handled by the components
      return Promise.resolve({ 
        data: { 
          success: true,
          data: null,
          isMockData: true 
        } 
      });
    }
    
    return Promise.reject(error);
  }
);

export default api;