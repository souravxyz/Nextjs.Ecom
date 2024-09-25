import axios from "axios";
import { productURL, userURL } from "../endpoints";

const axiosInstance = axios.create({
  baseURL: productURL,
});

const authAxiosInstance = axios.create({
  baseURL: userURL,
});

// Interceptors for axios instance
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors for auth axios instance
authAxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, authAxiosInstance }; // Ensure both instances are exported
