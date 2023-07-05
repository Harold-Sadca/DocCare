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
const AppointmentDB = db.Appointment;

async function createDoctorModel(doctor: TypeDoctor) {
  try {
    const newDoctor = await DoctorDB.create(doctor);
    newDoctor.password = null;
    return newDoctor;
  } catch (error) {
    throw new Error();
  }
}

async function getDoctorModel(id: string) {
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
              as: 'medicalInfos',
              required: false,
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
    const doctors = await DoctorDB.findAll({
      include: {
        model: Appointment,
        as: 'doctorAppointments',
        required: false,
        include: [
          {
            model: Patient,
            as: 'patientAppointment',
            required: false,
            include: [
              {
                model: MedicalInfo,
                as: 'medicalInfos',
                required: false,
              },
            ],
          },
        ],
      },
    });
    doctors.map((doctor) => {
      return (doctor.password = null);
    });
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
    const medicalInfo = await MedicalInfoDB.create(newMedicalInfo);
    patient.addMedicalInfo(medicalInfo);
    await medicalInfo.save();
    // await patient.save();
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
    console.log(patient, 'before');
    patient.summary = newPatientSummary;
    await patient.save();
    console.log(patient, 'after');
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function attendAppointmentModel(appointmentId: string) {
  try {
    const appointment = (await AppointmentDB.findOne({
      where: { id: appointmentId },
    })) as Appointment;
    appointment.attended = true;
    await appointment.save();
    return appointment;
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
  attendAppointmentModel,
};
