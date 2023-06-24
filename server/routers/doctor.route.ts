import express from "express";
import { Router } from "express";
import {
    createDoctor,
  getDoctor,
  getDoctors,
  createPatientSummary,
  createMedicalInfo,
} from "../controllers/doctor.controller";



const app = express();
const doctorRouter = Router();


doctorRouter.post('/doctor', createDoctor);
doctorRouter.get('/doctor/:id', getDoctor);
doctorRouter.get('/doctors', getDoctors);
doctorRouter.post('/doctor/:id/medical-info', createMedicalInfo)
doctorRouter.post('/summaries', createPatientSummary);

export {doctorRouter};


//doctorRouter.post('/doctors/:id/prescriptions', createPrescription);
// doctorRouter.post('/doctors/:id/notes', createDoctorNote);