const API_CONFIG = {
    // Change this based on environment
    BASE_URL: import.meta.env.PROD 
      ? 'https://e-dash-list-your-product-here-3.onrender.com' 
      : 'http://localhost:3000',
    
    // Common headers for all API requests
    getHeaders() {
      const token = localStorage.getItem('token');
      return {
        'Content-Type': 'application/json',
        'Authorization': token ? `bearer ${JSON.parse(token)}` : ''
      };
    }
  };
  
  export default API_CONFIG;