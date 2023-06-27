"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messages_1 = require("./models/methods/messages");
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
    // receive a message from the client
    socket.on("send", (args) => __awaiter(void 0, void 0, void 0, function* () {
        const newMessage = yield (0, messages_1.sendMessageModel)(args);
        // socket.on("click", (message, user) => {
        // logger.info(user)
        // if (user === '') {
        //   socket.broadcast.emit("hello back", message)
        // } else {
        //   socket.to(user).emit("hello back", message)
        // }
        socket.broadcast.emit("send", newMessage);
        socket.emit("sent", newMessage);
    }));
});
server.listen(port, () => {
    logger_1.default.info(`Server is running at http://localhost:${port}`);
});
