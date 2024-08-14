import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Booking API',
      version: '1.0.0',
      description: 'API documentation for Express Booking',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app: { use: (arg0: string, arg1: RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>[], arg2: RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) => void; }) => {
  app.use('/swagger/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
