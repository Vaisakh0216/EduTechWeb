import axiosInstance from "../config/axiosConfig";

export const listCourses = async () => {
  try {
    const response = await axiosInstance.get("/courses");
    return response?.data?.data;
  } catch (error) {
    throw new Error("Error creating course");
  }
};
