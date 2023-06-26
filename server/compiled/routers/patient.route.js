"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const patient_controller_1 = require("../controllers/patient.controller");
const authentication_1 = require("../middleware/authentication");
const patientRouter = (0, express_1.Router)();
exports.patientRouter = patientRouter;
patientRouter.post('/patient/register', patient_controller_1.createPatient);
patientRouter.post('/patient/login', patient_controller_1.loginPatient);
patientRouter.get('/patient/:id', patient_controller_1.getPatient);
patientRouter.get('/patients', patient_controller_1.getPatients);
patientRouter.put('/patient/:id', patient_controller_1.updatePatient);
patientRouter.delete('/patient/:id', patient_controller_1.deletePatient);
patientRouter.get('/patient/:id/last-checkup', authentication_1.patientAuthMiddleware, patient_controller_1.getLastCheckup);
