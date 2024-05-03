import express from 'express';

const serverRunner = async (port) => {
  const server = express();

  server.use(express.json());

  server.get('/', (req, res) => {
    res.send('<h1>Hello express!</h1>');
  });

  server.listen(port, () => {
    console.log(`✅ Server was runned on http://127.0.0.1:${port}`);
  });
};

export default serverRunner;
