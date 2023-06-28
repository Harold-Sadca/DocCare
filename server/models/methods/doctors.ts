import db from '../schema/index';
import { TypeDoctor, TypeMedicalInfo } from '../../types/types';
import { Patient } from '../schema/Patient';
import { Appointment } from '../schema/Appointment';
import logger from '../../logger';
import { Doctor } from '../schema/Doctor';
import { MedicalInfo } from '../schema/MedicalInfo';

const DoctorDB = db.Doctor;
const PatientDB = db.Patient;
const MedicalInfoDB = db.MedicalInfo;

async function createDoctorModel(doctor: TypeDoctor) {
  try {
    console.log(doctor);
    const newDoctor = await DoctorDB.create(doctor);
    console.log(newDoctor);
    return newDoctor;
  } catch (error) {
    throw new Error();
  }
}

async function getDoctorModel(id: string) {
  console.log(id);
  try {
    const doctor = await DoctorDB.findOne({
      where: { id: id },
      include: [
        {
          model: Appointment,
          as: 'doctorAppointments',
          required: false,
          include: [
            {
              model: Patient,
              as: 'patientAppointment',
              required: false,
            },
          ],
        },
        {
          model: Patient,
          as: 'patients',
          required: false,
          include: [
            {
              model: Appointment,
              as: 'patientAppointments',
              required: false,
              include: [
                {
                  model: Doctor,
                  as: 'doctorAppointment',
                  attributes: { include: ['name', 'licenseNumber'] },
                  required: false,
                },
              ],
            },
            {
              model: MedicalInfo,
              as: 'medicalInfo',
            },
          ],
        },
      ],
    });
    return doctor;
  } catch (error) {
    throw new Error();
  }
}

async function getDoctorsModel() {
  try {
    console.log('working?');
    const doctors = await DoctorDB.findAll({
      include: {
        model: Appointment,
        as: 'doctorAppointments',
        required: false,
      },
    });
    console.log(doctors);
    return doctors;
  } catch (error) {
    throw new Error();
  }
}

async function createMedicalInfoModel(
  newMedicalInfo: TypeMedicalInfo,
  patientId: string
) {
  try {
    const patient = (await PatientDB.findOne({
      where: { id: patientId },
    })) as Patient;
    logger.info(newMedicalInfo);
    const medicalInfo = await MedicalInfoDB.create(newMedicalInfo);
    logger.info('here');
    patient.setMedicalInfo(medicalInfo);
    await medicalInfo.save();
    return medicalInfo;
  } catch (error) {
    throw new Error();
  }
}

async function createPatientSummaryModel(
  newPatientSummary: string,
  patientId: string
) {
  try {
    const patient = (await PatientDB.findOne({
      where: { id: patientId },
    })) as Patient;
    patient.summary = newPatientSummary;
    await patient.save();
    return patient;
  } catch (error) {
    throw new Error();
  }
}

export {
  createDoctorModel,
  getDoctorModel,
  getDoctorsModel,
  createMedicalInfoModel,
  createPatientSummaryModel,
};
