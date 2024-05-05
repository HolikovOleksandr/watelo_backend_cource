import { Router } from 'express';
import { UserController } from './UserController.js';

/**
 * Router class for handling user-related routes.
 */
class UserRouter {
  /**
   * Constructs a new UserRouter instance.
   * @param {UserController} controller - The user controller instance.
   * @throws {Error} Throws an error if the provided controller is not an instance of UserController.
   */
  constructor(controller) {
    if (!(controller instanceof UserController)) {
      throw new Error('⛔ UserRouter expects UserController');
    }

    this.controller = controller;
    this.routes = Router();
    this.initializeRoutes();
  }

  /**
   * Initializes user-related routes.
   */
  initializeRoutes() {
    // Route for getting all users
    this.routes.get('/', (req, res) => {
      this.controller.getAllUsers(req, res);
    });

    // Route for getting a user by ID
    this.routes.get('/:id', (req, res) => {
      this.controller.getUserById(req, res);
    });

    // Route for creating a new user
    this.routes.post('/', (req, res) => {
      this.controller.createNewUser(req, res);
    });

    // Route for updating a user by ID
    this.routes.patch('/:id', (req, res) => {
      this.controller.updateUser(req, res);
    });

    // Route for deleting a user by ID
    this.routes.delete('/:id', (req, res) => {
      this.controller.deleteUserById(req, res);
    });

    // Route for deleting all users
    this.routes.delete('/', (req, res) => {
      this.controller.deleteAllUsers(req, res);
    });
  }
}

export default UserRouter;
