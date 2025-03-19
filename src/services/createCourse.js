import axiosInstance from "../config/axiosConfig";

export const createCourse = async (courseData) => {
  try {
    const response = await axiosInstance.post("/courses", courseData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating course");
  }
};
