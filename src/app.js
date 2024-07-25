import express from 'express';
import router from './routes/index.js';
import { swaggerUi, specs } from './swagger.js';
import errorHandler from './middleware/errorHandler.js';

/**
 * Initializes the Express application.
 * @returns {object} The Express application.
 */
const app = express();
app.use(express.json());

/**
 * Main router for the vehicles endpoint.
 * @name /vehicles
 * @function
 */
app.use('/vehicles', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * Error handling middleware.
 * @function
 */
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
