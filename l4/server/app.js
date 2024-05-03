import { configDotenv } from 'dotenv';
import serverRunner from './src/serverRunner.js';
configDotenv();

const app = async () => {
  const port = process.env.port | 3000;
  serverRunner(port);
};

app();
