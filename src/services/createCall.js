import axiosInstance from "../config/axiosConfig";

export const createCall = async (callData) => {
  try {
    const response = await axiosInstance.post("/calls", callData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating call");
  }
};
