import axiosInstance from "../config/axiosConfig";

export const listAgents = async () => {
  try {
    const response = await axiosInstance.get("/agents");
    return response?.data;
  } catch (error) {
    throw new Error("Error listing agents");
  }
};
