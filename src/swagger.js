import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle API',
      version: '1.0.0',
      description: 'A simple Express Vehicle API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/**/*.js'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
