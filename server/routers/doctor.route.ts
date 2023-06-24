import express from "express";
import { Router } from "express";
import {
    createDoctor,
  getDoctor,
  getDoctors,
  createPatientSummary,
} from "../controllers/doctor.controller";



const app = express();
const doctorRouter = Router();


doctorRouter.post('/doctors', createDoctor);
doctorRouter.get('/doctors/:id', getDoctor);
doctorRouter.get('/doctors', getDoctors);
doctorRouter.post('/doctors/:id/summaries', createPatientSummary);

export {doctorRouter};