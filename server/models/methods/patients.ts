import db from '../schema/index';
import {
  TypeAppointment,
  TypeAvailability,
  TypePatient,
} from '../../types/types';
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
    newPatient.password = null;
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
          as: 'medicalInfos',
          required: false,
        },
      ],
    });
    patient!.status = 'Online';
    patient?.save();
    patient!.password = null;
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
          as: 'medicalInfos',
          required: false,
        },
      ],
    });
    patients.map((patient) => {
      return (patient.password = null);
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
    const patient = await PatientDB.findOne({ where: { id: patientId } });
    await patient?.destroy();
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function getLastCheckupModel(patientId: string) {
  try {
    const patient = await PatientDB.findOne({
      where: { id: patientId },
      include: [
        {
          model: MedicalInfo,
          as: 'medicalInfos',
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
    if (appointmentsAttended && appointmentsAttended.length > 0) {
      // const doctorNote = patient?.medicalInfos?.;
      const sortedAppointments = appointmentsAttended?.sort((a, b) => {
        const datesA = a.date;
        const datesB = b.date;
        const dateA = new Date(datesA[0]);
        const dateB = new Date(datesB[0]);
        return dateA.getTime() - dateB.getTime();
      }) as Appointment[];
      const lastDate = sortedAppointments[0];
      // return { doctorNote, lastDate };
      return lastDate;
    } else return undefined;
  } catch (error) {
    throw new Error();
  }
}

function formatStateDate(date: string) {
  const [year, month, day] = date.split('-');
  const formattedMonth = month.startsWith('0') ? month.substring(1) : month;
  const formattedDay = day.startsWith('0') ? day.substring(1) : day;
  return [Number(year), Number(formattedMonth), Number(formattedDay)];
}

async function createAppointmentModel(
  patientId: string,
  doctorId: string,
  appointment: TypeAppointment
) {
  console.log(appointment);
  try {
    console.log(appointment);
    const newAppointment = await AppointmentDB.create(appointment);
    console.log('whyyyyy');
    const doctor = (await DoctorDB.findOne({
      where: { id: doctorId },
    })) as Doctor;
    const patient = (await PatientDB.findOne({
      where: { id: patientId },
    })) as Patient;
    doctor?.addDoctorAppointment(newAppointment);
    doctor?.addPatient(patient);
    const [year, month, day] = formatStateDate(newAppointment.date);
    const time = Number(newAppointment.time.substring(0, 2));
    patient?.addPatientAppointment(newAppointment);
    newAppointment.setDoctorAppointment(doctor);
    newAppointment.setPatientAppointment(patient);
    const doctorAvailability = doctor.availability as TypeAvailability;
    const prevAvailability = doctorAvailability
      ? doctorAvailability[month][day]
      : [];
    const newDoctorAvailability = {
      ...doctorAvailability,
      [month]: {
        ...doctorAvailability[month],
        [day]: [...prevAvailability, time],
      },
    };
    await doctor.update({
      availability: { ...doctorAvailability, ...newDoctorAvailability },
    });
    await doctor?.save();
    await patient?.save();
    await newAppointment?.save();
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

async function logoutPatientModel(id: string) {
  try {
    const updatedPatient = await PatientDB.findOne({ where: { id } });
    updatedPatient!.status = 'Offline';
    await updatedPatient?.save();
    return updatedPatient;
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
  logoutPatientModel,
};
