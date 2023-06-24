import express from 'express';
import { Router } from 'express';
import {
  createDoctor,
  getDoctor,
  getDoctors,
  createPatientSummary,
  createMedicalInfo,
} from '../controllers/doctor.controller';

const app = express();
const doctorRouter = Router();

doctorRouter.post('/doctor', createDoctor);
doctorRouter.get('/doctor/:id', getDoctor);
doctorRouter.get('/doctors', getDoctors);
doctorRouter.put('/doctor/medical-info/:id', createMedicalInfo);
doctorRouter.put('/doctor/summary/:id', createPatientSummary);

export { doctorRouter };
