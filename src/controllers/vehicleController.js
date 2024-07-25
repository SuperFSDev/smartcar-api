import handleApiRequest from '../utils/requestHandler.js';

/**
 * Retrieves the vehicle information and sends it in the response.
 *
 * @async
 * @function getVehicleInfo
 * @param {object} req - The Express request object.
 * @param {object} req.params - The parameters from the request URL.
 * @param {string} req.params.id - The vehicle ID.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves when the request handling is complete.
 */
const getVehicleInfo = async (req, res, next) => {
  const { id } = req.params;

  handleApiRequest(
    '/getVehicleInfoService',
    { id, responseType: 'JSON' },
    res,
    next,
    (data) => ({
      vin: data.data.vin.value,
      color: data.data.color.value,
      doorCount: data.data.fourDoorSedan.value === 'True' ? 4 : 2,
      driveTrain: data.data.driveTrain.value,
    }),
  );
};

export default getVehicleInfo;
