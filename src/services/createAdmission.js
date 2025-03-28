import axiosInstance from "../config/axiosConfig";

export const createAdmission = async (admissionData) => {
  try {
    const response = await axiosInstance.post("/admissions", admissionData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating admission");
  }
};
