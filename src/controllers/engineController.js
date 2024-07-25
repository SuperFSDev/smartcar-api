import handleApiRequest from '../utils/requestHandler.js';
import ApiError from '../utils/apiError.js';

/**
 * Handles the action to start or stop a vehicle's engine and sends the result in the response.
 *
 * @async
 * @function actionEngine
 * @param {object} req - The Express request object.
 * @param {object} req.params - The parameters from the request URL.
 * @param {string} req.params.id - The vehicle ID.
 * @param {object} req.body - The body of the request.
 * @param {string} req.body.action - The action to perform on the engine ('START' or 'STOP').
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} A promise that resolves when the request handling is complete.
 * @throws {ApiError} Throws an ApiError if the action is invalid.
 */
const actionEngine = async (req, res, next) => {
  const { id } = req.params;
  const { action } = req.body;
  let command;
  if (action === 'START') {
    command = 'START_VEHICLE';
  } else if (action === 'STOP') {
    command = 'STOP_VEHICLE';
  } else {
    command = null;
  }
  if (!command) {
    return next(new ApiError(400, 'Invalid action'));
  }

  return handleApiRequest(
    '/actionEngineService',
    { id, command, responseType: 'JSON' },
    res,
    next,
    (data) => ({
      status:
        data.data.actionResult.status === 'EXECUTED' ? 'success' : 'error',
    }),
  );
};

export default actionEngine;
