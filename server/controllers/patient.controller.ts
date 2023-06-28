import { Request, Response } from 'express';
import {
  createPatientModel,
  getPatientModel,
  getPatientsModel,
  getLastCheckupModel,
  updatePatientModel,
  deletePatientModel,
  createAppointmentModel,
  deleteAppointmentModel,
} from '../models/methods/patients';
import { TypeAppointment } from '../types/types';
import db from '.././models/schema/index';
const PatientDB = db.Patient;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../logger';

const saltRounds = 12;
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

async function createPatient(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      allergies,
      bloodType,
      medications,
      surgicalHistory,
      familyMedicalHistory,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newPatient = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      allergies,
      bloodType,
      medications,
      surgicalHistory,
      familyMedicalHistory,
      userType: 'patient',
    };
    const createPatient = await createPatientModel(newPatient);
    console.log(createPatient);
    const accessToken = jwt.sign({ id: createPatient.id }, SECRET_KEY);
    res.status(201).json({
      message: 'Patient account created successfully',
      result: createPatient,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a patient account' });
  }
}

async function loginPatient(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const patient = await PatientDB.findOne({ where: { email: email } });
    if (!patient) {
      throw new Error('Patient not found');
    }
    const patientPassword = patient.password;
    if (!patientPassword) {
      throw new Error('Patient password is null');
    }
    const validatedPass = await bcrypt.compare(password, patientPassword);
    if (!validatedPass) {
      throw new Error('Invalid password');
    }
    const accessToken = jwt.sign({ id: patient.id }, SECRET_KEY);

    const userAuthenticated = await getPatientModel(patient.id);
    res.status(200).json({
      message: `Welcome, ${patient?.name}!`,
      result: { accessToken, userAuthenticated },
    });
  } catch (error) {
    res.status(401).json({ error: 'Username or password is incorrect' });
  }
}

async function getPatient(req: Request, res: Response) {
  try {
    const auth = req.patient;
    const id = auth?.id as string;
    const patient = await getPatientModel(id);
    res.status(200).json({
      message: `Welcome, ${patient?.name}!`,
      result: patient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get the patient account' });
  }
}

async function logout(req: Request, res: Response) {}

async function getPatients(req: Request, res: Response) {
  console.log('hey from controller');
  try {
    console.log('controllers');
    const patients = await getPatientsModel();
    // console.log(patients);
    res.status(200).send(patients);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get patients account' });
  }
}

async function updatePatient(req: Request, res: Response) {
  try {
    const patientId = req.params.id;
    const { name, dateOfBirth, email, password, phoneNumber, address } =
      req.body;
    const updatedPatient = {
      name,
      dateOfBirth,
      email,
      password,
      phoneNumber,
      address,
    };
    const updatePatient = await updatePatientModel(patientId, updatedPatient);
    res.status(200).json({
      message: 'Patient account updated successfully',
      result: updatePatient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update patient account' });
  }
}
async function deletePatient(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const deletedPatient = await deletePatientModel(id);
    res.status(200).json({
      message: 'Patient account deleted successfully',
      result: deletedPatient,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete patient account' });
  }
}

async function getLastCheckup(req: Request, res: Response) {
  try {
    const id = req.params.id;
    console.log({ id });
    const patientLastCheckup = await getLastCheckupModel(id);
    console.log({ patientLastCheckup });
    if (patientLastCheckup?.lastDate === undefined) {
      res.status(200).json({ message: `You haven't had any appointments yet` });
    } else {
      res.status(200).json({
        message: `Last checkup found successfully`,
        result: patientLastCheckup,
      });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to get patient last checkup' });
  }
}

async function createAppointment(req: Request, res: Response) {
  try {
    const patientId = req.params.id;
    const { doctorId, newAppointment } = req.body;
    const createAppointment = await createAppointmentModel(
      patientId,
      doctorId,
      newAppointment
    );
    res.status(201).json({
      message: 'Appointment created successfully',
      result: createAppointment,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a appointment' });
  }
}

async function deleteAppointment(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const deletedAppointment = await deleteAppointmentModel(id);
    res.status(200).json({
      message: 'Appointment deleted successfully',
      result: deletedAppointment,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete appointment' });
  }
}
export {
  createPatient,
  getPatient,
  logout,
  getPatients,
  updatePatient,
  deletePatient,
  getLastCheckup,
  createAppointment,
  deleteAppointment,
  loginPatient,
};
