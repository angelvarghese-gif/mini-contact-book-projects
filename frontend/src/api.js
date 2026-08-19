import axios from 'axios';

// Connect to Django backend deployed on Render
const api = axios.create({
  baseURL: 'https://mini-contact-book-backend-project.onrender.com/api/',
});

// Automatically attach the access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Automatically refresh the access token when it expires
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const res = await axios.post(
            'https://mini-contact-book-backend-project.onrender.com/api/token/refresh/',
            {
              refresh: refreshToken,
            }
          );

          localStorage.setItem(
            'access_token',
            res.data.access
          );

          originalRequest.headers.Authorization =
            `Bearer ${res.data.access}`;

          return api(originalRequest);

        } catch (refreshErr) {
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