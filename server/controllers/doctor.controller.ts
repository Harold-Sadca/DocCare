import { Request, Response } from 'express';
import {
  createDoctorModel,
  getDoctorModel,
  getDoctorsModel,
  createMedicalInfoModel,
  createPatientSummaryModel,
  attendAppointmentModel,
} from '../models/methods/doctors';
import {
  TypeDoctor,
  TypeMedicalInfo,
  TypeAvailability,
  TypeMonth,
} from '../types/types';
import { Doctor } from '../models/schema/Doctor';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

function createEmptyAvailability() {
  const availability = {} as TypeAvailability;
  const month = {} as TypeMonth;
  for (let day = 1; day <= 31; day++) {
    month[day] = [];
  }
  for (let monthNum = 1; monthNum <= 12; monthNum++) {
    availability[monthNum] = month;
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
      profilePicture,
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
      profilePicture,
      userType: 'doctor',
      availability: createEmptyAvailability(),
    } as TypeDoctor;
    const createDoctor = await createDoctorModel(newDoctor);
    const accessToken = jwt.sign({ id: createDoctor.id }, SECRET_KEY);
    res.status(201).json({
      message: 'Doctor account created successfully',
      result: createDoctor,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a doctor account' });
  }
}

async function loginDoctor(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor || doctor.password === null) {
      res.status(401).json({ error: 'Password and email do not match' });
    } else {
      const validatedPass = await bcrypt.compare(password, doctor.password);
      if (validatedPass) {
        const accessToken = jwt.sign({ id: doctor.id }, SECRET_KEY);
        const userAuthenticated = await getDoctorModel(doctor.id);
        console.log(userAuthenticated);
        userAuthenticated!.password = null;
        res.status(200).json({
          message: `Welcome, ${doctor?.name}!`,
          result: { accessToken, userAuthenticated },
        });
      }
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to login' });
  }
}

async function getDoctor(req: Request, res: Response) {
  try {
    const auth = req.doctor;
    const id = auth?.id as string;
    const doctor = await getDoctorModel(id);
    res.status(200).send({
      message: `Welcome, ${doctor?.name}!`,
      result: doctor,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get the doctor account' });
  }
}
async function getDoctors(req: Request, res: Response) {
  try {
    const doctors = await getDoctorsModel();
    res.status(200).send(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get doctors account' });
  }
}

async function createMedicalInfo(req: Request, res: Response) {
  try {
    console.log(req.body);
    const { prescription, doctorNote, doctorName } = req.body;
    const patientId = req.params.patientId;
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
    res.status(500).json({ error: 'Failed to create a medical info' });
  }
}

async function createPatientSummary(req: Request, res: Response) {
  try {
    const patientId = req.params.patientId;
    const { newPatientSummary } = req.body;
    const createPatientSummary = await createPatientSummaryModel(
      newPatientSummary,
      patientId
    );

    res.status(201).json({
      message: 'Patient summary created successfully',
      result: createPatientSummary,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a patient summary' });
  }
}

async function attendAppointment(req: Request, res: Response) {
  try {
    const appointmentId = req.params.appointmentId;
    const attendAppointment = await attendAppointmentModel(appointmentId);
    res.status(201).json({
      message: 'Mark appointment as attended successfully',
      result: attendAppointment,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark appointment as attended' });
  }
}

export {
  createDoctor,
  getDoctor,
  getDoctors,
  createMedicalInfo,
  createPatientSummary,
  loginDoctor,
  attendAppointment,
};
