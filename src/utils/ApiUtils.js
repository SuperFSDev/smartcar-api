import axios from 'axios';
import ApiError from './apiError.js';

const MM_API_BASE_URL = 'https://platform-challenge.smartcar.com/v1';

/**
 * Makes an API request using axios and handles errors.
 *
 * @async
 * @function makeApiRequest
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {object} payload - The payload to send in the request body.
 * @returns {Promise<object>} A promise that resolves to the response data.
 * @throws {ApiError} Throws an ApiError if the request fails.
 */
const makeApiRequest = async (endpoint, payload) => {
  try {
    const response = await axios.post(`${MM_API_BASE_URL}${endpoint}`, payload);

    return response.data;
  } catch (error) {
    throw new ApiError(
      error.response?.status || 500,
      error.response?.data?.message || 'Failed to fetch data',
    );
  }
};

export default makeApiRequest;
