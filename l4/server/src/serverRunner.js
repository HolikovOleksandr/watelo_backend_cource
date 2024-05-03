import express from 'express';
import userRouter from './user/UserRouter.js';
import { UserController } from './user/UserController.js';

const serverRunner = async (port) => {
  const server = express();
  server.use(express.json());

  const dbPath = './src/user/data/users_db.json';
  const userController = new UserController(dbPath);
  server.use('/users', new userRouter(userController).routes);

  server.listen(port, () => {
    console.log(`🦾 Server was runned on http://127.0.0.1:${port}`);
  });
};

export default serverRunner;
