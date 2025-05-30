import axiosInstance from "../config/axiosConfig";

export const getAllTransactions = async (data) => {
  try {
    const response = await axiosInstance.get("/transactions");
    return response?.data;
  } catch (error) {
    throw new Error("Error listing transactions");
  }
};
