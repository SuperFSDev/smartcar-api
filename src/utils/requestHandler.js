import makeApiRequest from './apiUtils.js';
import logger from './logger.js';

/**
 * Handles an API request by making a call to the specified endpoint, logging the request and response,
 * transforming the response data, and sending the result back to the client.
 *
 * @async
 * @function handleApiRequest
 * @param {string} endpoint - The API endpoint to make the request to.
 * @param {object} params - The parameters to include in the API request.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @param {function} transformData - A function to transform the response data.
 * @returns {Promise<void>} A promise that resolves when the request handling is complete.
 * @throws Will call the next middleware function with an error if the API request fails.
 */
const handleApiRequest = async (endpoint, params, res, next, transformData) => {
  try {
    logger.info(
      `Request to ${endpoint} with params: ${JSON.stringify(params)}`,
    );
    const data = await makeApiRequest(endpoint, params);
    logger.info(`Response from ${endpoint}: ${JSON.stringify(data)}`);

    const transformedData = transformData(data);
    res.status(200).json(transformedData);
  } catch (error) {
    logger.error(`Error in ${endpoint}: ${error.message}`);
    next(error);
  }
};

export default handleApiRequest;
