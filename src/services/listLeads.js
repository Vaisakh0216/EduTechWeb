import axiosInstance from "../config/axiosConfig";

export const listLeads = async () => {
  try {
    const response = await axiosInstance.get("/leads");
    return response?.data;
  } catch (error) {
    throw new Error("Error listing leads");
  }
};
