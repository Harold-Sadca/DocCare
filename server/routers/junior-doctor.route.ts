import express from "express";
import { Router } from "express";
import {
    createJuniorDoctor, getJuniorDoctor, createJuniorNote
} from "../controllers/junior-doctor.controller";



const app = express();
const juniorDoctorRouter = Router();



juniorDoctorRouter.post('/junior-doctors', createJuniorDoctor);
juniorDoctorRouter.get('/junior-doctors/:id', getJuniorDoctor);
juniorDoctorRouter.post('/junior-doctors/:id/notes', createJuniorNote);

export {juniorDoctorRouter};