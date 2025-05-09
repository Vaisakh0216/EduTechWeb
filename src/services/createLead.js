import axiosInstance from "../config/axiosConfig";

export const createLead = async (leadData) => {
  try {
    const response = await axiosInstance.post("/leads", leadData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating lead");
  }
};
