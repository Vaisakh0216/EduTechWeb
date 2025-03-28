import axiosInstance from "../config/axiosConfig";

export const updateCollege = async (collegeData, id) => {
  try {
    const response = await axiosInstance.put(
      `/institutions/${id}`,
      collegeData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating course");
  }
};
