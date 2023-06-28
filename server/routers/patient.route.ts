import express from 'express';
import { Router } from 'express';
import {
  createPatient,
  getPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getLastCheckup,
  createAppointment,
  loginPatient,
} from '../controllers/patient.controller';
import {
  patientAuthMiddleware,
  anyDoctorAuthMiddleware,
  doctorAuthMiddleware,
} from '../middleware/authorization';

const patientRouter = Router();

patientRouter.post('/patient/register', createPatient);
patientRouter.post('/patient/login', loginPatient);
patientRouter.get('/patient', patientAuthMiddleware, getPatient);
patientRouter.get('/patients', getPatients);
// patientRouter.get('/patients', anyDoctorAuthMiddleware, getPatients);
patientRouter.post('/patient/appointment/:id', createAppointment);
patientRouter.put('/patient', patientAuthMiddleware, updatePatient);
patientRouter.delete('/patient/:id', patientAuthMiddleware, deletePatient);
patientRouter.get('/patient/last-checkup/:id', getLastCheckup);

export { patientRouter };
