import axiosInstance from "../config/axiosConfig";

export const getAdmissionTransaction = async (admissionNo, catNo) => {
  try {
    const response = await axiosInstance.get(
      `/transactions/by-reference/${admissionNo}/${catNo}`
    );
    return response;
  } catch (error) {
    throw new Error("Error listing transaction");
  }
};
