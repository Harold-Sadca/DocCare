import { Router } from 'express';
import { patientRouter } from './patient.route';
import { messagesRouter } from './messages.route';
import { juniorDoctorRouter } from './junior-doctor.route';
import { doctorRouter } from './doctor.route';

export const router = Router();

router.use('/patient', patientRouter);
router.use('/messages', messagesRouter);
router.use('/juniorDoctor', juniorDoctorRouter);
router.use('/doctor', doctorRouter);
