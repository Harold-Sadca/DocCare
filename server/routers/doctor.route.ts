import express from 'express';
import { Router } from 'express';
import {
  createDoctor,
  getDoctor,
  getDoctors,
  createPatientSummary,
  createMedicalInfo,
  loginDoctor,
  attendAppointment,
} from '../controllers/doctor.controller';
import { doctorAuthMiddleware } from '../middleware/authorization';

const doctorRouter = Router();

doctorRouter.post('/doctor/register', createDoctor);
doctorRouter.post('/doctor/login', loginDoctor);
doctorRouter.get('/doctor', doctorAuthMiddleware, getDoctor);
doctorRouter.get('/doctors', getDoctors);
doctorRouter.post(
  '/doctor/:id/medical-info',
  doctorAuthMiddleware,
  createMedicalInfo
);
doctorRouter.put(
  '/doctor/summary/:id',
  doctorAuthMiddleware,
  createPatientSummary
);
doctorRouter.put('/doctor/attend/:id', doctorAuthMiddleware, attendAppointment);

export { doctorRouter };
