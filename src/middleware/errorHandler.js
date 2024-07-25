import ApiError from '../utils/apiError.js';

/**
 * Error handling middleware for Express.
 * @param {object} err - The error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
const errorHandler = (err, req, res, _next) => {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export default errorHandler;
