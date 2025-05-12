import axiosInstance from "../config/axiosConfig";

export const updateCall = async (callData, id) => {
  try {
    const response = await axiosInstance.put(`/calls/${id}`, callData);
    return response.data;
  } catch (error) {
    throw new Error("Error updating call");
  }
};
