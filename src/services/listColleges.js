import axiosInstance from "../config/axiosConfig";

export const listColleges = async () => {
  try {
    const response = await axiosInstance.get("/institutions");
    return response?.data;
  } catch (error) {
    throw new Error("Error listing colleges");
  }
};
