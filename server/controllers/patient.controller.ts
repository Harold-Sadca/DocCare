import { Express, Request, Response } from 'express';
import {
  createPatientModel,
  getPatientModel,
  getPatientsModel,
} from '../models/methods/patients.ts';

async function createPatient(req: Request, res: Response) {
  try {
    const { name, email, password, phoneNumber, address, date_birth, gender } =
      req.body;
    const newPatient = {
      name,
      email,
      password,
      phoneNumber,
      address,
      date_birth,
      gender,
    };
    const createPatient = await createPatientModel(newPatient);
    res.status(201).json({
      message: 'Patient account created successfully',
      result: createPatient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a patient account' });
  }
}
async function getPatient(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const patient = await getPatientModel(id);
    res.status(200).json({
      message: `Welcome, ${patient.name}!`,
      result: patient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get the patient account' });
  }
}
async function getPatients(req: Request, res: Response) {
  try {
    const patients = await getPatientsModel();
    res.status(200).send(patients);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get patients account' });
  }
}

async function updatePatient(req: Request, res: Response) {}
async function deletePatient(req: Request, res: Response) {}
async function getLastCheckup(req: Request, res: Response) {}
export {
  createPatient,
  getPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getLastCheckup,
};
