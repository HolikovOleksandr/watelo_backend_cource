import swaggerAutogen from 'swagger-autogen';
import doc from './doc.js';

const outputFile = './swagger-output.json';
// const routes = ['./src/serverRunner.js'];
// const routes = ['../../app.js'];

const routes = [
  './src/serverRunner.js',
  './src/user/UserRouter.js',
  './app.js',
];

swaggerAutogen()(outputFile, routes, doc);
