const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Products API - Ocean Professional',
      version: '1.0.0',
      description: 'Modern, minimalist REST API for managing products (id, name, price, quantity).',
    },
    tags: [
      { name: 'Health', description: 'Service health check' },
      { name: 'Products', description: 'Product management endpoints' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
