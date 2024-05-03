import { Router } from 'express';
import { UserController } from './UserController.js';

class UserRouter {
  constructor(controller) {
    if (!(controller instanceof UserController)) {
      throw new Error('⛔ UserRouter expects UserController');
    }

    this.controller = controller;
    this.routes = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.routes.get('/', (req, res) => this.controller.getAllUsers(req, res));

    this.routes.get('/:id', (req, res) =>
      this.controller.getUserById(req, res)
    );

    this.routes.post('/', (req, res) =>
      this.controller.createNewUser(req, res)
    );

    this.routes.patch('/:id', (req, res) =>
      this.controller.updateUser(req, res)
    );

    this.routes.delete('/:id', (req, res) =>
      this.controller.deleteUserById(req, res)
    );

    this.routes.delete('/', (req, res) =>
      this.controller.deleteAllUsers(req, res)
    );
  }
}

export default UserRouter;
