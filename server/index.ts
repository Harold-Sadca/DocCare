import express, { Express } from 'express';
import { sendMessageModel } from './models/methods/messages';
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

io.use((socket, next) => {

  const name = socket.handshake.auth.name;
  if (!name) {
    return next(new Error("invalid username"));
  }
  next();
});

io.on("connection", (socket) => {

  const newRoom = socket.handshake.auth.name
  socket.join(newRoom)
  socket.to(newRoom).emit('returned', 'test')
  // logger.info(io.sockets.adapter.rooms)
  // io.of("/").adapter.on("create-room", (room) => {
  //   socket.emit("room created")
  // })
  
  // //if you join a room that doesnt exist it will create it...
  // socket.emit("patients", patients);

  // socket.on("private message", ({ content, to }) => {
  //   socket.to(to).emit("private message", {
  //     content,
  //     from: socket.id,
  //   });
  // });
});




// io.on("connection", (socket) => {

//   //verify or authenticate them
//   //then close the connection if it failed
//   // logger.info(socket.id)
//   socket.emit("your id", socket.id)

//   //closes the connection if a "logout" is sent
//   socket.on('logout', () => {
//     io.close()
//   })

//   socket.on("patient message", async (message, patientId, juniorId) => {
//     //save it to the database then returns the created message
//     const newMessage = await sendMessageModel(message)
//     //this will send it to the junior doctor
//     //access it from to the front using "from patient"
//     socket.to(patientId).emit("from patient", newMessage)
//     //this will send it back to the patient
//     //access it from the front using "patient sent"
//     //this way we can identify the message the patient sent / received
//     logger.info(message, patientId)
//     socket.to(patientId).emit("patient sent", newMessage)
//     // socket.broadcast.emit("send", newMessage)
//     // socket.emit("sent", newMessage)
//   });

//   //this just does the opposite
//   socket.on("junior sent", async (message, patientId, juniorId) => {
//     logger.info(message)
//     const newMessage = await sendMessageModel(message)
//     socket.to(patientId).emit("from junior", newMessage)
//     socket.to(juniorId).emit("junior sent", newMessage)
//   })
// });

server.listen(port,() => {
  logger.info(`Server is running at http://localhost:${port}`);
  
});
