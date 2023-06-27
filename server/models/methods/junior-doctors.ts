import { TypeJuniorDoctor } from '../../types/types';
import { Message } from '../schema/Message';
import { Patient } from '../schema/Patient';
import db from '../schema/index';
import jwt, { JwtPayload } from 'jsonwebtoken';

const PatientDB = db.Patient;
const JuniorDoctorDB = db.JuniorDoctor;
const SECRET_KEY = process.env.SECRET_KEY as string;

async function createJuniorDoctorModel(juniorDoctor: TypeJuniorDoctor) {
  try {
    const newJuniorDoctor = await JuniorDoctorDB.create(juniorDoctor);
    return newJuniorDoctor;
  } catch (error) {
    throw new Error();
  }
}

async function getJuniorDoctorModel(authHeaders: string) {
  const token = authHeaders.split(' ')[1];
  try {
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload & { id: string };
    const juniorDoctor = await JuniorDoctorDB.findOne({
      where: { id },
      include: {
        model: Message,
        as: 'juniorMessages',
        required: false,
      },
    });
    return juniorDoctor;
  } catch (error) {
    throw new Error();
  }
}
async function createJuniorNoteModel(juniorNote: string, patientId: string) {
  try {
    const patient = (await PatientDB.findOne({
      where: { id: patientId },
    })) as Patient;
    patient.juniorNotes = juniorNote;
    await patient.save();
    return patient;
  } catch (error) {
    throw new Error();
  }
}
export { createJuniorDoctorModel, getJuniorDoctorModel, createJuniorNoteModel };
