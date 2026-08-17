import axios from 'axios';

// Create an instance linking directly to our Django server URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Request Interceptor: Automatically attaches the Access Token to every request header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catches 401 errors, requests a new access token, and retries the failed request seamlessly
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (refreshToken) {
        try {
          // Attempt to fetch a clean access token from the Django refresh endpoint
          const res = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: refreshToken,
          });
          
          localStorage.setItem('access_token', res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          
          // Retry the original request that failed
          return api(originalRequest);
        } catch (refreshErr) {
          // If the refresh token is also expired, log the user out completely
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(refreshErr);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
