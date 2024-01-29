import express from 'express';
import dotenv from 'dotenv';
import {AccountRoute} from "./account/AccountRoute";
import {errorHandler} from "./displayableErrors/ErrorHandler";

dotenv.config();
const port = process.env.PORT;
const app = express();

const accountRoute = new AccountRoute();

app.use('/api/accounts', accountRoute.getRouter());

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res?.send('Hello World!');
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});