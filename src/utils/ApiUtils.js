import axios from "axios";
import ApiError from "./ApiError.js";

const MM_API_BASE_URL = "https://platform-challenge.smartcar.com/v1";

export const makeApiRequest = async (endpoint, payload) => {
  try {
    const response = await axios.post(`${MM_API_BASE_URL}${endpoint}`, payload);

    return response.data;
  } catch (error) {
    throw new ApiError(
      error.response?.status || 500,
      error.response?.data?.message || "Failed to fetch data"
    );
  }
};
