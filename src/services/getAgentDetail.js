import axiosInstance from "../config/axiosConfig";

export const getAgentDetail = async (agentId) => {
  try {
    const response = await axiosInstance.get(`/agents/${agentId}`);
    return response?.data;
  } catch (error) {
    throw new Error("Error listing categories");
  }
};
