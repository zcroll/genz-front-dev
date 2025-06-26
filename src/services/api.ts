import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create a base API instance with common configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      // Server responded with an error status
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized - clear auth state and redirect to login
        localStorage.removeItem('auth_token');
        // You could also use a store action here to log the user out
      }

      if (status === 403) {
        // Forbidden - user doesn't have permission
        console.error('You do not have permission to access this resource');
      }

      if (status === 404) {
        // Not found
        console.error('Resource not found');
      }

      if (status === 500) {
        // Server error
        console.error('Server error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server');
    } else {
      // Something else happened while setting up the request
      console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  }
);

// Generic GET request
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic POST request
export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic PUT request
export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Generic DELETE request
export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
