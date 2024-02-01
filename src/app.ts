import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {AccountRoute} from "./account/AccountRoute";
import {errorHandler} from "./displayableErrors/ErrorHandler";

dotenv.config();
const port = process.env.PORT;
const app = express();

// adding body parsing middleware to extract the payload of the request
app.use(express.json());
app.use(cors());

const accountRoute = new AccountRoute();

app.use('/api/accounts', accountRoute.getRouter());

app.get('/', (req, res) => {
  res?.send('Hello World!');
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});