import axiosInstance from "../config/axiosConfig";

export const listAdmissions = async () => {
  try {
    const response = await axiosInstance.get("/admissions");
    return response;
  } catch (error) {
    throw new Error("Error listing admissions");
  }
};
