import axiosInstance from "../config/axiosConfig";

export const createAdmission = async (admissionData) => {
  try {
    const response = await axiosInstance.post(
      "/createAdmission",
      admissionData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating admission");
  }
};
