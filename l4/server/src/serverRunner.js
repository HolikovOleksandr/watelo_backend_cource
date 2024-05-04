import express from 'express';
import morgan from 'morgan';
import UserRouter from './user/UserRouter.js';
import { UserController } from './user/UserController.js';

/**
 * Function to run the server.
 * @param {number} port - The port number on which the server should listen.
 */
const serverRunner = async (port) => {
  // Create an Express server instance
  const server = express();

  // Middleware to parse incoming request bodies as JSON
  server.use(express.json());

  // Middleware for logging HTTP requests
  server.use(morgan('dev'));

  // Initialize user-related routes
  const dbPath = './user/data/users_db.json';
  const userController = new UserController(dbPath);
  const userRouter = new UserRouter(userController);
  server.use('/users', userRouter.routes);

  // Start the server and listen on the specified port
  server.listen(port, () => {
    console.log(`🦾 Server was runned on http://127.0.0.1:${port}`);
  });
};

export default serverRunner;
