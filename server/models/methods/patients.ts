import db from '../schema/index';
import { TypeAppointment, TypePatient } from '../../types/types';
import { Patient } from '../schema/Patient';
import { Appointment } from '../schema/Appointment';
import { Message } from '../schema/Message';
import { MedicalInfo } from '../schema/MedicalInfo';
import { Doctor } from '../schema/Doctor';
import logger from '../../logger';

const PatientDB = db.Patient;
const AppointmentDB = db.Appointment;
const DoctorDB = db.Doctor;

async function createPatientModel(patient: TypePatient) {
  try {
    const newPatient = await PatientDB.create(patient);
    return newPatient;
  } catch (error) {
    throw new Error();
  }
}

async function getPatientModel(id: string) {
  try {
    const patient = await PatientDB.findOne({
      where: { id: id },
      include: [
        {
          model: Message,
          as: 'patientMessages',
          required: false,
        },
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
    });
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function getPatientsModel() {
  try {
    const patients = await PatientDB.findAll({
      include: [
        {
          model: Message,
          as: 'patientMessages',
          required: false,
        },
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
          required: false,
        },
      ],
    });
    return patients;
  } catch (error) {
    throw new Error();
  }
}

async function updatePatientModel(
  patientId: string,
  updatedPatient: Partial<Patient>
) {
  try {
    const patient = await PatientDB.findOne({ where: { id: patientId } });
    patient?.set(updatedPatient);
    await patient?.save();
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function deletePatientModel(patientId: string) {
  try {
    console.log(patientId);
    const patient = await PatientDB.findOne({ where: { id: patientId } });
    console.log(patient);
    await patient?.destroy();
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function getLastCheckupModel(patientId: string) {
  console.log('model working');
  try {
    //     patient -> appointments -> attended (true) -> get the last date
    // -> medical-info -> get the notes
    const patient = await PatientDB.findOne({
      where: { id: patientId },
      include: [
        {
          model: MedicalInfo,
          as: 'medicalInfo',
        },
        {
          model: Appointment,
          as: 'patientAppointments',
          include: [
            {
              model: Doctor,
              as: 'doctorAppointment',
              attributes: { include: ['name', 'licenseNumber'] },
            },
          ],
        },
      ],
    });
    const appointmentsAttended = patient?.patientAppointments?.filter(
      (appointment) => appointment.attended
    );
    if (appointmentsAttended) {
      const doctorNote = patient?.medicalInfo?.doctorNote;
      const sortedAppointments = appointmentsAttended?.sort((a, b) => {
        const datesA = a.date;
        const datesB = b.date;
        const dateA = new Date(datesA[0]);
        const dateB = new Date(datesB[0]);
        return dateA.getTime() - dateB.getTime();
      }) as Appointment[];
      const lastDate = sortedAppointments[0];
      console.log(patient?.medicalInfo);
      console.log(doctorNote);
      return { doctorNote, lastDate };
    } else return undefined;
  } catch (error) {
    throw new Error();
  }
}

async function createAppointmentModel(
  patientId: string,
  doctorId: string,
  appointment: TypeAppointment
) {
  try {
    const newAppointment = await AppointmentDB.create(appointment);
    const doctor = await DoctorDB.findOne({ where: { id: doctorId } });
    const patient = await PatientDB.findOne({ where: { id: patientId } });
    doctor?.addDoctorAppointment(newAppointment);
    patient?.addPatientAppointment(newAppointment);
    await doctor?.save();
    await patient?.save();
    return newAppointment;
  } catch (error) {
    throw new Error();
  }
}

async function deleteAppointmentModel(appointmentId: string) {
  try {
    const appointment = await AppointmentDB.findOne({
      where: { id: appointmentId },
    });
    await appointment?.destroy();
    return appointment;
  } catch (error) {
    throw new Error();
  }
}

export {
  createPatientModel,
  getPatientModel,
  getPatientsModel,
  updatePatientModel,
  getLastCheckupModel,
  deletePatientModel,
  createAppointmentModel,
  deleteAppointmentModel,
};
