import axiosInstance from "../config/axiosConfig";

export const createCourseFee = async (courseFeeData) => {
  try {
    const response = await axiosInstance.post("/courseFees", courseFeeData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating course fee");
  }
};
