import logger from '../../logger';
import { TypeJuniorDoctor } from '../../types/types';
import { Message } from '../schema/Message';
import { Patient } from '../schema/Patient';
import db from '../schema/index';
const PatientDB = db.Patient;
const JuniorDoctorDB = db.JuniorDoctor;
async function createJuniorDoctorModel(juniorDoctor: TypeJuniorDoctor) {
  try {
    const newJuniorDoctor = await JuniorDoctorDB.create(juniorDoctor);
    newJuniorDoctor.password = null;
    return newJuniorDoctor;
  } catch (error) {
    throw new Error();
  }
}
async function getJuniorDoctorModel(id: string) {
  try {
    const juniorDoctor = await JuniorDoctorDB.findOne({
      where: { id },
      include: {
        model: Message,
        as: 'juniorMessages',
        required: false,
      },
    });
    juniorDoctor!.password = null;
    return juniorDoctor;
  } catch (error) {
    throw new Error();
  }
}
async function createJuniorNoteModel(patientId: string, juniorNote: string) {
  try {
    const patient = (await PatientDB.findOne({
      where: { id: patientId },
    })) as Patient;
    patient.juniorNotes = juniorNote;
    // patient.juniorNotes = patient.juniorNotes || [];
    // const notes = patient.juniorNotes as unknown as string;
    // patient.juniorNotes = [notes, juniorNote];

    // console.log(patient.juniorNotes);
    // patient.juniorNotes?.push(juniorNote);
    await patient.save();
    console.log(patient);
    return patient;
  } catch (error) {
    throw new Error();
  }
}
export { createJuniorDoctorModel, getJuniorDoctorModel, createJuniorNoteModel };
