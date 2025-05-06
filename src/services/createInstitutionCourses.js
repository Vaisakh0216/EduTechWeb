import axiosInstance from "../config/axiosConfig";

export const createInstitutionCourses = async (data) => {
  try {
    const response = await axiosInstance.post("/courseInstitution", data);
    return response.data;
  } catch (error) {
    throw new Error("Error creating courseInstitution");
  }
};
