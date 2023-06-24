import express from "express";
import { Router } from "express";
import {  createPatient,
    getPatient,
    getPatients,
    updatePatient,
    deletePatient,
    getLastCheckup,} from "../controllers/patient.controller";
import  {patientAuthMiddleware}  from "../middleware/patient.auth";
import { Patient } from "../models/schema/Patient";


const app = express();
const patientRouter = Router();


// patientRouter.post("/register", controller.create);
// patientRouter.post("/login", controller.login);
// patientRouter.get("/profile",  patientAuthMiddleware , controller.profile);
// patientRouter.post("/logout", controller.logout);
patientRouter.post('/patient', createPatient);
patientRouter.get('/patient/:id', getPatient);
patientRouter.get('/patients', getPatients);
patientRouter.put('/patients/:id', updatePatient);
patientRouter.delete('/patient/:id', deletePatient);
patientRouter.get('/patient/:id/last-checkup', getLastCheckup);

export {patientRouter};
  
