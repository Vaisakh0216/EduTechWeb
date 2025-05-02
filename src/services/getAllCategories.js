import axiosInstance from "../config/axiosConfig";

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response?.data;
  } catch (error) {
    throw new Error("Error listing categories");
  }
};
