import axiosInstance from "../config/axiosConfig";

export const createAgentFee = async (agentData) => {
  try {
    const response = await axiosInstance.post("/agentFees", agentData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating agent fee");
  }
};
