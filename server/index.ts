import express, { Express } from 'express';
import cors from 'cors';
import { patientRouter } from './routers/patient.route';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(patientRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
