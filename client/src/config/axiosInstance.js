import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://iqac-calculator.onrender.com/', // Your Spring Boot backend URL
});

export default axiosInstance;