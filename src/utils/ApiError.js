/**
 * Custom error class to handle API errors.
 *
 * @class ApiError
 * @extends {Error}
 */
export default class ApiError extends Error {
  /**
   * Creates an instance of ApiError.
   *
   * @param {number} statusCode - The HTTP status code of the error.
   * @param {string} message - The error message.
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
