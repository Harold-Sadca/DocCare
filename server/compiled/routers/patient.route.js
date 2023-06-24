"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const patient_controller_1 = require("../controllers/patient.controller");
const app = (0, express_1.default)();
const patientRouter = (0, express_2.Router)();
exports.patientRouter = patientRouter;
// patientRouter.post("/register", controller.create);
// patientRouter.post("/login", controller.login);
// patientRouter.get("/profile",  patientAuthMiddleware , controller.profile);
// patientRouter.post("/logout", controller.logout);
// Create a new patient
patientRouter.post('/patients', patient_controller_1.createPatient);
patientRouter.get('/patients/:id', patient_controller_1.getPatient);
patientRouter.get('/patients', patient_controller_1.getPatients);
patientRouter.put('/patients/:id', patient_controller_1.updatePatient);
patientRouter.delete('/patients/:id', patient_controller_1.deletePatient);
patientRouter.get('/patients/:id/last-checkup', patient_controller_1.getLastCheckup);
