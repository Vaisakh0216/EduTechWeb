import axiosInstance from "../config/axiosConfig";

export const updateCourseFee = async (courseFeeData, id) => {
  console.log("coming here", id);
  try {
    const response = await axiosInstance.put(
      `/courseFees/${id}`,
      courseFeeData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error update course fee");
  }
};
