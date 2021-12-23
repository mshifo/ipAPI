import express from 'express';
import routes from './api';
import config from './config';

const app = express();

app.use(express.json());
app.use(routes);

// start express server
try {
  app.listen(config.port, (): void => {
    console.log(`Connected successfully on port ${config.port}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error}`);
}
