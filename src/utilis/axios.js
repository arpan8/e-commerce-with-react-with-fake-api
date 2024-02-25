// axiosInstance.js
import axios from 'axios';

const baseURL = 'https://fakestoreapi.com';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // set your desired timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, such as adding headers or tokens
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config
  },
  (error) => 
    // Handle request error
     Promise.reject(error)
  
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => 
    // You can modify the response data here
     response
  ,
  (error) => {
    // Handle response error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('Bad Request:', data);
          // Handle 400 error
          break;
        case 401:
          console.error('Unauthorized:', data);
          // Redirect to the login page
          localStorage.clear()
          break;
        case 404:
          console.error('Not Found:', data);
          // Handle 404 error
          break;
        case 500:
          console.error('Internal Server Error:', data);
          // Handle 500 error
          break;
        default:
          console.error(`Unhandled Status Code: ${status}`, data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('General error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
