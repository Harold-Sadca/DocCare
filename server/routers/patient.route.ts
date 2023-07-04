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
  logoutPatient,
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
patientRouter.put('/patients/logout/:patientId', logoutPatient);
patientRouter.post('/patient/appointment/:patientId', createAppointment);
patientRouter.put('/patient', patientAuthMiddleware, updatePatient);
patientRouter.delete(
  '/patient/:patientId',
  patientAuthMiddleware,
  deletePatient
);
patientRouter.get('/patient/last-checkup/:patientId', getLastCheckup);

export { patientRouter };
