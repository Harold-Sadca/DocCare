import { JuniorDoctor } from '../schema/JuniorDoctor';
import { TypeJuniorDoctor } from '../../types/types';
import { Patient } from '../schema/Patient';

async function createJuniorDoctorModel(juniorDoctor: TypeJuniorDoctor) {
  try {
    const newJuniorDoctor = await JuniorDoctor.create(juniorDoctor);
    return newJuniorDoctor;
  } catch (error) {
    throw new Error();
  }
}

async function getJuniorDoctorModel(juniorId: string) {
  try {
    const juniorDoctor = await JuniorDoctor.findOne({
      where: { id: juniorId },
    });
    return juniorDoctor;
  } catch (error) {
    throw new Error();
  }
}
async function createJuniorNoteModel(juniorNote: string, patientId: string) {
  try {
    const patient = (await Patient.findOne({
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
