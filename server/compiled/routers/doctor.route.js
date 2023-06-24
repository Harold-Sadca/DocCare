"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const doctor_controller_1 = require("../controllers/doctor.controller");
const app = (0, express_1.default)();
const doctorRouter = (0, express_2.Router)();
exports.doctorRouter = doctorRouter;
doctorRouter.post('/doctors', doctor_controller_1.createDoctor);
doctorRouter.get('/doctors/:id', doctor_controller_1.getDoctor);
doctorRouter.get('/doctors', doctor_controller_1.getDoctors);
doctorRouter.post('/doctors/:id/prescriptions', doctor_controller_1.createPrescription);
doctorRouter.post('/doctors/:id/notes', doctor_controller_1.createDoctorNote);
doctorRouter.post('/doctors/:id/summaries', doctor_controller_1.createPatientSummary);
