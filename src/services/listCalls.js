import axiosInstance from "../config/axiosConfig";

export const listCalls = async () => {
  try {
    const response = await axiosInstance.get("/calls");
    return response?.data;
  } catch (error) {
    throw new Error("Error listing calls");
  }
};
