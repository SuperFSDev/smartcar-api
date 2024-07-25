import handleApiRequest from '../utils/requestHandler.js';

/**
 * Retrieves the security status of a vehicle and sends it in the response.
 *
 * @async
 * @function getSecurityStatus
 * @param {object} req - The Express request object.
 * @param {object} req.params - The parameters from the request URL.
 * @param {string} req.params.id - The vehicle ID.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves when the request handling is complete.
 */
const getSecurityStatus = async (req, res, next) => {
  const { id } = req.params;

  handleApiRequest(
    '/getSecurityStatusService',
    { id, responseType: 'JSON' },
    res,
    next,
    (data) =>
      data.data.doors.values.map((door) => ({
        location: door.location.value,
        locked: door.locked.value === 'True',
      })),
  );
};

export default getSecurityStatus;
