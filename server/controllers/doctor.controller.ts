import { Express, Request, Response } from 'express';
import {
  createDoctorModel,
  getDoctorModel,
  getDoctorsModel,
  createMedicalInfoModel,
  createPatientSummaryModel,
} from '../models/methods/doctors';

import { TypeDoctor, TypeMedicalInfo, TypeAvailability } from '../types/types';

function createEmptyAvailability() {
  const availability = {} as TypeAvailability;
  for (let day = 1; day <= 31; day++) {
    availability[day] = [];
  }
  return availability;
}

async function createDoctor(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      password,
      specialisation,
      phoneNumber,
      address,
      licenseNumber,
      gender,
      about,
    } = req.body;
    const newDoctor = {
      name,
      email,
      password,
      specialisation,
      phoneNumber,
      address,
      licenseNumber,
      gender,
      about,
      availability: createEmptyAvailability(),
    } as TypeDoctor;
    const createDoctor = await createDoctorModel(newDoctor);
    res.status(201).json({
      message: 'Doctor account created successfully',
      result: createDoctor,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a doctor account' });
  }
}
async function getDoctor(req: Request, res: Response) {
  try {
    const doctorId = req.params.id;
    const doctor = await getDoctorModel(doctorId);
    res.status(200).send({
      message: `Welcome, ${doctor?.name}!`,
      result: doctor,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get the doctor account' });
  }
}
async function getDoctors(req: Request, res: Response) {
  try {
    const doctors = await getDoctorsModel();
    res.status(200).send(doctors);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get doctors account' });
  }
}

async function createMedicalInfo(req: Request, res: Response) {
  console.log('got here');
  console.log(req.body);
  try {
    const { prescription, doctorNote, doctorName } = req.body;
    const patientId = req.params.id;
    const newMedicalInfo = {
      prescription,
      doctorNote,
      doctorName,
    } as TypeMedicalInfo;
    const createMedicalInfo = await createMedicalInfoModel(
      newMedicalInfo,
      patientId
    );
    res.status(200).json({
      message: 'Medical info created successfully',
      result: createMedicalInfo,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a medical info' });
  }
}

async function createPatientSummary(req: Request, res: Response) {
  try {
    const patientId = req.params.id;
    const { summary, doctorName } = req.body;
    const newSummary = `${summary} by: ${doctorName}`;
    const createPatientSummary = await createPatientSummaryModel(
      newSummary,
      patientId
    );
    res.status(201).json({
      message: 'Patient summary created successfully',
      result: createPatientSummary,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a patient summary' });
  }
}

export {
  createDoctor,
  getDoctor,
  getDoctors,
  createMedicalInfo,
  createPatientSummary,
};
