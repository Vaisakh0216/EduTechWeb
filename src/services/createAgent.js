import axiosInstance from "../config/axiosConfig";

export const createAgent = async (agentData) => {
  try {
    const response = await axiosInstance.post("/agents", agentData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating agent");
  }
};
