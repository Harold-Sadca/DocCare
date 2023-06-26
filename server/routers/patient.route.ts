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
import { patientAuthMiddleware } from '../middleware/authentication';



const patientRouter = Router();


patientRouter.post('/patient/register', createPatient);
patientRouter.post('/patient/login', loginPatient )
patientRouter.get('/patient/:id', getPatient);
patientRouter.get('/patients', getPatients);
patientRouter.put('/patient/:id', updatePatient);
patientRouter.delete('/patient/:id', deletePatient);
patientRouter.get('/patient/:id/last-checkup', patientAuthMiddleware, getLastCheckup);

export { patientRouter };
