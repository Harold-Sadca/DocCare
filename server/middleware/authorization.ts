import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../models/schema/index';
import { Patient } from '../models/schema/Patient';
import { Doctor } from '../models/schema/Doctor';
import { JuniorDoctor } from '../models/schema/JuniorDoctor';

const DoctorDB = db.Doctor;
const JuniorDoctorDB = db.JuniorDoctor;
const PatientDB = db.Patient;

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

declare module 'express' {
  interface Request {
    patient?: Patient;
    doctor?: Doctor;
    juniorDoctor?: JuniorDoctor;
  }
}

const patientAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    const patient = await PatientDB.findOne({ where: { id } });
    if (!patient) {
      console.log('no patient!');
      return res.sendStatus(401);
    }
    req.patient = patient;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

const doctorAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('hello from doctor middleware');

  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const doctor = await DoctorDB.findOne({ where: { id } });
    if (!doctor) return res.sendStatus(401);
    req.doctor = doctor;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

const juniorDoctorAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    console.log(token);
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    console.log(id);
    const juniorDoctor = await JuniorDoctorDB.findOne({ where: { id } });
    console.log(juniorDoctor);
    if (!juniorDoctor) return res.sendStatus(401);
    req.juniorDoctor = juniorDoctor;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

const anyDoctorAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    const juniorDoctor = await JuniorDoctorDB.findOne({ where: { id } });
    const doctor = await DoctorDB.findOne({ where: { id } });
    if (!doctor && !juniorDoctor) return res.sendStatus(401);
    if (doctor) req.doctor = doctor;
    if (juniorDoctor) req.juniorDoctor = juniorDoctor;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export {
  patientAuthMiddleware,
  doctorAuthMiddleware,
  juniorDoctorAuthMiddleware,
  anyDoctorAuthMiddleware,
};
