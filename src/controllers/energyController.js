import handleApiRequest from '../utils/requestHandler.js';

/**
 * Retrieves the fuel range of a vehicle and sends it in the response.
 *
 * @async
 * @function getFuelRange
 * @param {object} req - The Express request object.
 * @param {object} req.params - The parameters from the request URL.
 * @param {string} req.params.id - The vehicle ID.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves when the request handling is complete.
 */
export const getFuelRange = async (req, res, next) => {
  const { id } = req.params;

  handleApiRequest(
    '/getEnergyService',
    { id, responseType: 'JSON' },
    res,
    next,
    (data) => ({
      percent: data.data.tankLevel.value,
    }),
  );
};

/**
 * Retrieves the battery range of a vehicle and sends it in the response.
 *
 * @async
 * @function getBatteryRange
 * @param {object} req - The Express request object.
 * @param {object} req.params - The parameters from the request URL.
 * @param {string} req.params.id - The vehicle ID.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves when the request handling is complete.
 */
export const getBatteryRange = async (req, res, next) => {
  const { id } = req.params;

  handleApiRequest(
    '/getEnergyService',
    { id, responseType: 'JSON' },
    res,
    next,
    (data) => ({
      percent: data.data.batteryLevel.value,
    }),
  );
};
