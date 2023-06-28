"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientRouter = void 0;
const express_1 = require("express");
const patient_controller_1 = require("../controllers/patient.controller");
const authorization_1 = require("../middleware/authorization");
const patientRouter = (0, express_1.Router)();
exports.patientRouter = patientRouter;
patientRouter.post('/patient/register', patient_controller_1.createPatient);
patientRouter.post('/patient/login', patient_controller_1.loginPatient);
patientRouter.get('/patient', authorization_1.patientAuthMiddleware, patient_controller_1.getPatient);
patientRouter.get('/patients', patient_controller_1.getPatients);
// patientRouter.get('/patients', anyDoctorAuthMiddleware, getPatients);
patientRouter.post('/patient/appointment/:id', patient_controller_1.createAppointment);
patientRouter.put('/patient', authorization_1.patientAuthMiddleware, patient_controller_1.updatePatient);
patientRouter.delete('/patient/:id', authorization_1.patientAuthMiddleware, patient_controller_1.deletePatient);
patientRouter.get('/patient/last-checkup/:id', patient_controller_1.getLastCheckup);
