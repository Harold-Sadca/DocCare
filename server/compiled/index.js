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
    //verify or authenticate them
    //then close the connection if it failed
    // logger.info(socket.id)
    socket.emit("your id", socket.id);
    //closes the connection if a "logout" is sent
    socket.on('logout', () => {
        io.close();
    });
    socket.on("patient message", (message, patientId, juniorId) => __awaiter(void 0, void 0, void 0, function* () {
        //save it to the database then returns the created message
        const newMessage = yield (0, messages_1.sendMessageModel)(message);
        //this will send it to the junior doctor
        //access it from to the front using "from patient"
        socket.to(patientId).emit("from patient", newMessage);
        //this will send it back to the patient
        //access it from the front using "patient sent"
        //this way we can identify the message the patient sent / received
        logger_1.default.info(message, patientId);
        socket.to(patientId).emit("patient sent", newMessage);
        // socket.broadcast.emit("send", newMessage)
        // socket.emit("sent", newMessage)
    }));
    //this just does the opposite
    socket.on("junior sent", (message, patientId, juniorId) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info(message);
        const newMessage = yield (0, messages_1.sendMessageModel)(message);
        socket.to(patientId).emit("from junior", newMessage);
        socket.to(juniorId).emit("junior sent", newMessage);
    }));
});
server.listen(port, () => {
    logger_1.default.info(`Server is running at http://localhost:${port}`);
});
