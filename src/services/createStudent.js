import axiosInstance from "../config/axiosConfig";

export const createStudent = async (studentData) => {
  try {
    const response = await axiosInstance.post("/students", studentData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating student");
  }
};
