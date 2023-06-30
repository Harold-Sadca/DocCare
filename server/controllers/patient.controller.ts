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
  logoutPatientModel,
} from '../models/methods/patients';
import { TypePatient } from '../types/types';
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
      profilePicture,
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
      profilePicture,
      allergies,
      bloodType,
      medications,
      surgicalHistory,
      familyMedicalHistory,
      status: 'Online',
      userType: 'patient',
    } as TypePatient;
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
      return res.status(403).send({ error: 'Username or password not found' });
    }
    const patientPassword = patient.password;
    if (!patientPassword) {
      return res.status(403).send({ error: 'Username or password not found' });
    }
    const validatedPass = await bcrypt.compare(password, patientPassword);
    if (!validatedPass) {
      return res.status(403).send({ error: 'Username or password not found' });
    }
    const accessToken = jwt.sign({ id: patient.id }, SECRET_KEY);

    const userAuthenticated = await getPatientModel(patient.id);
    userAuthenticated!.status = 'Online'
    await userAuthenticated?.save()
    res.status(200).json({
      message: `Welcome, ${patient?.name}!`,
      result: { accessToken, userAuthenticated },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
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

async function logoutPatient(req: Request, res: Response) {
  try {
    const id = req.params.id
    const patient = await logoutPatientModel(id)
    res.status(200).json({
      message: `Goodbye, ${patient?.name}!`,
      result: patient
    })
  } catch (error) {
    res.status(400).json({error: 'Unable to logout'})
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
    const patientLastCheckup = await getLastCheckupModel(id);
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
    const { doctorId, appointment } = req.body;
    const createAppointment = await createAppointmentModel(
      patientId,
      doctorId,
      appointment
    );
    res.status(201).json({
      message: 'Appointment created successfully',
      result: createAppointment,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create an appointment' });
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
  logoutPatient,
  getPatients,
  updatePatient,
  deletePatient,
  getLastCheckup,
  createAppointment,
  deleteAppointment,
  loginPatient,
};
