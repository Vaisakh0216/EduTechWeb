import axiosInstance from "../config/axiosConfig";

export const createTransaction = async (transactionData) => {
  try {
    const response = await axiosInstance.post("/transactions", transactionData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating transaction");
  }
};
