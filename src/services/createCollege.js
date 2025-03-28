import axiosInstance from "../config/axiosConfig";

export const createCollege = async (collegeData) => {
  try {
    const response = await axiosInstance.post("/institutions", collegeData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating college");
  }
};
