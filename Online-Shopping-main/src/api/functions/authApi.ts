// Import necessary utilities and endpoints
import { authAxiosInstance } from "../axiosInstance";
import { endpoints } from "../endpoints";
import { useRouter } from "next/router"; // To handle redirection after logout

// Login function
export const login = async (credentials: any) => {
  try {
    const response = await authAxiosInstance.post(endpoints.login, credentials);
    if (response.data) {
      // Set a cookie with the user data
      document.cookie = `user=${JSON.stringify(response.data)}; path=/;`;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Ensure to throw the error for handling
  }
};

// Signup function
export const signup = async (userData: any) => {
  try {
    const response = await authAxiosInstance.post(endpoints.signup, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Ensure to throw the error for handling
  }
};

// Logout function
export const logout = async () => {
  // Clear cookie or handle token removal if necessary
  document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;'; // Clear cookie
  return true; // Return true to indicate successful logout
};
