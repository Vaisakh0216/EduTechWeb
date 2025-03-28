import axiosInstance from "../config/axiosConfig";

export const listCourseFee = async () => {
  try {
    const response = await axiosInstance.get("/courseFees");
    return response?.data;
  } catch (error) {
    throw new Error("Error listing course fees");
  }
};
