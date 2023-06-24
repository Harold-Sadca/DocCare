import { Patient } from '../schema/Patient';
import { TypeAppointment, TypePatient } from '../../types/types';
import { Appointment } from '../schema/Appointment';

async function createPatientModel(patient: TypePatient) {
  try {
    const newPatient = await Patient.create(patient);
    return newPatient;
  } catch (error) {
    throw new Error();
  }
}

async function getPatientModel(id: string) {
  try {
    const patient = await Patient.findOne({ where: { id: id } });
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function getPatientsModel() {
  try {
    const patients = await Patient.findAll();
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
    const patient = await Patient.findOne({ where: { id: patientId } });
    patient?.set(updatedPatient);
    await patient?.save();
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function deletePatientModel(patientId: string) {
  try {
    const patient = await Patient.findOne({ where: { id: patientId } });
    await patient?.destroy();
    return patient;
  } catch (error) {
    throw new Error();
  }
}

async function getLastCheckupModel(patientId: string) {
  try {
    //     patient -> appointments -> attended (true) -> get the last date
    // -> medical-info -> get the notes
    const patient = await Patient.findOne({ where: { id: patientId } });
    const appointmentsAttended = patient?.patientAppointments?.filter(
      (appointment) => appointment.attended
    );
    const doctorNote = patient?.medicalInfo?.doctorNotes;
    const sortedAppointments = appointmentsAttended?.sort((a, b) => {
      const datesA = a.date;
      const datesB = b.date;
      const dateA = new Date(datesA[0]);
      const dateB = new Date(datesB[0]);
      return dateA.getTime() - dateB.getTime();
    }) as Appointment[];
    const lastDate = sortedAppointments[0];
    return { doctorNote, lastDate };
  } catch (error) {
    throw new Error();
  }
}

async function createAppointmentModel(appointment: TypeAppointment) {
  try {
    const newAppointment = await Appointment.create(appointment);
    return newAppointment;
  } catch (error) {
    throw new Error();
  }
}

async function deleteAppointmentModel(appointmentId: string) {
  try {
    const appointment = await Appointment.findOne({
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
