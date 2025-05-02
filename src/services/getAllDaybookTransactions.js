import axiosInstance from "../config/axiosConfig";

export const getAllDaybookTransactions = async (data) => {
  console.log("this is daya", data);
  try {
    const response = await axiosInstance.post("/daybook", data);
    return response;
  } catch (error) {
    throw new Error("Error listing transactions");
  }
};
