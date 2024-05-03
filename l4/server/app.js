import serverRunner from './src/serverRunner.js';
import { configDotenv } from 'dotenv';
configDotenv();

const app = async () => {
  const port = process.env.PORT | 3000;
  serverRunner(port);
};

app();
