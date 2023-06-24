import { Express, Request, Response } from 'express';
import {
  createDoctorModel,
  getDoctorModel,
  getDoctorsModel,
  createMedicalInfoModel
  createPatientSummaryModel,
} from '../models/methods/doctors.ts';

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
    };
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
      message: `Welcome, ${doctor.name}!`,
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
  try {
    const {prescription, doctor_notes, patientId} = req.body;
    const doctorId = req.params.id;
    const newMedicalInfo = {prescription, doctor_notes, doctorId, patientId}
    const createMedicalInfo = await createMedicalInfoModel(newMedicalInfo);
    res.status(201).json({
      message: 'Medical info created successfully',
      result: createMedicalInfo,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a medical info' });
  }
}

async function createPatientSummary(req: Request, res: Response) {
  try {
    const {patientId, patientSummary, doctorName} = req.body;
    const createPatientSummary = await createPatientSummaryModel(
      patientSummary,
      patientId,
      doctorName
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
