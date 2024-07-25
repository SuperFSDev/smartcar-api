import { createLogger, format, transports } from 'winston';

const { combine, timestamp: ts, printf, errors } = format;

const logFormat = printf(
  ({ level, message, timestamp, stack }) =>
    `${timestamp} ${level}: ${stack || message}`,
);

/**
 * Configures and creates a Winston logger instance.
 *
 * @constant {object} logger
 */
const logger = createLogger({
  level: 'info',
  format: combine(
    ts(),
    errors({ stack: true }), // capture stack trace
    logFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log' }),
  ],
});

export default logger;
