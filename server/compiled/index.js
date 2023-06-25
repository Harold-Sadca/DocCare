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
const pino_1 = __importDefault(require("pino"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger = (0, pino_1.default)({
    transport: {
        target: 'pino-pretty'
    }
});
const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true,
};
const app = (0, express_1.default)();
const port = process.env.PORT;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: corsConfig
});
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.use(patient_route_1.patientRouter);
app.use(messages_route_1.messagesRouter);
app.use(junior_doctor_route_1.juniorDoctorRouter);
app.use(doctor_route_1.doctorRouter);
io.on('connection', () => {
    logger.info('Socket connected!');
});
httpServer.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
});
