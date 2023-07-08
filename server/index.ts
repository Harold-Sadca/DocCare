import express, { Express } from 'express';
import { sendMessageModel } from './models/methods/messages';
import cors from 'cors';
import { patientRouter } from './routers/patient.route';
import { messagesRouter } from './routers/messages.route';
import { juniorDoctorRouter } from './routers/junior-doctor.route';
import { doctorRouter } from './routers/doctor.route';
import { createServer } from 'http';
import { Server } from 'socket.io';
import logger from './logger';
import dotenv from 'dotenv';
dotenv.config();

const corsConfig = {
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
};

const app: Express = express();
const port = process.env.PORT || 3001;

const server = createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(cors(corsConfig));
app.use(express.json());
app.use(patientRouter);
app.use(messagesRouter);
app.use(juniorDoctorRouter);
app.use(doctorRouter);

io.use((socket, next) => {
  const name = socket.handshake.auth.name;
  if (!name) {
    return next(new Error('invalid username'));
  }
  next();
});

io.on('connection', (socket) => {
  socket.broadcast.emit('patient logged');
  const newRoom = socket.handshake.auth.name;
  if (newRoom === 'junior') {
    socket.join('junior');
  } else {
    socket.join(newRoom);
  }

  socket.on('from junior', async (message, receiver) => {
    const newMessage = await sendMessageModel(message);
    socket.to(receiver).emit('from junior', newMessage);
  });
  socket.on('patient message', async (message) => {
    const newMessage = await sendMessageModel(message);
    socket.to('junior').emit('patient message', newMessage);
    socket.broadcast.emit('patient logged');
  });

  socket.on('patient logged', (args) => {
    socket.broadcast.emit('patient logged');
  });
});

server.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
