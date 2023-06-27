import express from 'express';
import { Router } from 'express';
import {
  createDoctor,
  getDoctor,
  getDoctors,
  createPatientSummary,
  createMedicalInfo,
  loginDoctor,
} from '../controllers/doctor.controller';
import {
  doctorAuthMiddleware,
  juniorDoctorAuthMiddleware,
} from '../middleware/authorization';

const doctorRouter = Router();

doctorRouter.post('/doctor/register', createDoctor);
doctorRouter.post('/doctor/login', loginDoctor);
doctorRouter.get('/doctor/:id', doctorAuthMiddleware, getDoctor);
doctorRouter.get('/doctors', juniorDoctorAuthMiddleware, getDoctors);
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

export { doctorRouter };
