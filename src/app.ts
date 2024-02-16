import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {AccountRoute} from "./account/AccountRoute";
import {errorHandlerMiddleware} from "./displayableErrors/ErrorHandlerMiddleware";
import {ParsingResponseBodyMiddleware} from "./ParsingResponseBodyMiddleware";

dotenv.config();
const port = process.env.PORT;
const app = express();

// adding body parsing middleware to extract the payload of the request
app.use(express.json());
// middleware to allow CORS
app.use(cors());
app.use(ParsingResponseBodyMiddleware)

const accountRoute = new AccountRoute();

app.use('/api/accounts', accountRoute.getRouter());

app.get('/', (req, res) => {
  res?.send('Hello World!');
});

app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});