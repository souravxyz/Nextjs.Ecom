import { axiosInstance } from "../axiosInstance"; // Corrected import
import { endpoints } from "../endpoints";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get(endpoints.products);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
