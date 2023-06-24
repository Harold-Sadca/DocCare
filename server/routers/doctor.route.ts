import express from "express";
import { Router } from "express";
import {
    createDoctor,
  getDoctor,
  getDoctors,
  createPrescription,
  createDoctorNote,
  createPatientSummary,
} from "../controllers/doctor.controller";



const app = express();
const doctorRouter = Router();


doctorRouter.post('/doctors', createDoctor);
doctorRouter.get('/doctors/:id', getDoctor);
doctorRouter.get('/doctors', getDoctors);
doctorRouter.post('/doctors/:id/prescriptions', createPrescription);
doctorRouter.post('/doctors/:id/notes', createDoctorNote);
doctorRouter.post('/doctors/:id/summaries', createPatientSummary);

export {doctorRouter};