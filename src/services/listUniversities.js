import axiosInstance from "../config/axiosConfig";

export const listUniversities = async () => {
  try {
    const response = await axiosInstance.get("/universities");
    return response?.data?.data;
  } catch (error) {
    throw new Error("Error listing universities");
  }
};
