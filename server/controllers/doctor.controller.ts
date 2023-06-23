import { Express, Request, Response } from 'express';
import {
  createDoctorModel,
  getDoctorModel,
  getDoctorsModel,
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
    const id = req.params.id;
    const doctor = await getDoctorModel(id);
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
async function createPrescription(req: Request, res: Response) {}
async function createDoctorNote(req: Request, res: Response) {}
async function createPatientSummary(req: Request, res: Response) {}

export {
  createDoctor,
  getDoctor,
  getDoctors,
  createPrescription,
  createDoctorNote,
  createPatientSummary,
};
