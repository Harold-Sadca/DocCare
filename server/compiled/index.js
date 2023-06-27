"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const patient_route_1 = require("./routers/patient.route");
const messages_route_1 = require("./routers/messages.route");
const junior_doctor_route_1 = require("./routers/junior-doctor.route");
const doctor_route_1 = require("./routers/doctor.route");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true,
};
const app = (0, express_1.default)();
const port = process.env.PORT;
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: corsConfig
});
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.use(patient_route_1.patientRouter);
app.use(messages_route_1.messagesRouter);
app.use(junior_doctor_route_1.juniorDoctorRouter);
app.use(doctor_route_1.doctorRouter);
io.on("connection", (socket) => {
    // send a message to the client
    logger_1.default.info(socket.id);
    // socket.emit("hello back", socket.id)
    // socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
    // receive a message from the client
    socket.on("click", (...args) => {
        // socket.on("click", (message, user) => {
        // logger.info(user)
        // if (user === '') {
        //   socket.broadcast.emit("hello back", message)
        // } else {
        //   socket.to(user).emit("hello back", message)
        // }
        socket.broadcast.emit("hello back", args);
        // socket.emit("hello back", args[0])
    });
});
server.listen(port, () => {
    logger_1.default.info(`Server is running at http://localhost:${port}`);
});
