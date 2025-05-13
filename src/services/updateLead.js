import axiosInstance from "../config/axiosConfig";

export const updateLead = async (leadData, id) => {
  try {
    const response = await axiosInstance.put(`/leads/${id}`, leadData);
    return response.data;
  } catch (error) {
    throw new Error("Error update lead data");
  }
};
