import express, { Express } from 'express';
import cors from 'cors';
import { patientRouter } from './routers/patient.route';
import { messagesRouter } from './routers/messages.route';
import { juniorDoctorRouter } from './routers/junior-doctor.route';
import { doctorRouter } from './routers/doctor.route';
import {createServer} from 'http'
import pino from 'pino';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const logger = pino({
  transport: {
    target:'pino-pretty'
  }
})


const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app: Express = express();
const port = process.env.PORT;

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: corsConfig
})

app.use(cors(corsConfig));
app.use(express.json());
app.use(patientRouter);
app.use(messagesRouter);
app.use(juniorDoctorRouter);
app.use(doctorRouter);

io.on('connection', () => {
  logger.info('Socket connected!')
})

httpServer.listen(port,() => {
  logger.info(`Server is running at http://localhost:${port}`);
  
});
