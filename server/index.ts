import express, { Express } from 'express';
import { sendMessageModel, getMessagesModel } from './models/methods/messages';
import cors from 'cors';
import { patientRouter } from './routers/patient.route';
import { messagesRouter } from './routers/messages.route';
import { juniorDoctorRouter } from './routers/junior-doctor.route';
import { doctorRouter } from './routers/doctor.route';
import {createServer} from 'http'
import { Server } from 'socket.io';
import logger from './logger';
import dotenv from 'dotenv';
dotenv.config();


const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app: Express = express();
const port = process.env.PORT;

const server = createServer(app)

const io = new Server(server, {
  cors: corsConfig
})

app.use(cors(corsConfig));
app.use(express.json());
app.use(patientRouter);
app.use(messagesRouter);
app.use(juniorDoctorRouter);
app.use(doctorRouter);

io.on("connection", (socket) => {

  // receive a message from the client
  socket.on("send", async (args) => {
    const newMessage = await sendMessageModel(args)
  // socket.on("click", (message, user) => {
    // logger.info(user)
    // if (user === '') {
    //   socket.broadcast.emit("hello back", message)
    // } else {
    //   socket.to(user).emit("hello back", message)
    // }
    socket.broadcast.emit("send", newMessage)
    socket.emit("sent", newMessage)
  });
});

server.listen(port,() => {
  logger.info(`Server is running at http://localhost:${port}`);
  
});
