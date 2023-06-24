// async function getDoctor(req, res) {}
// async function getDoctors(req, res) {}
// async function createPrescription(req, res) {}
// async function createDoctorNote(req, res) {}
// async function createPatientSummary(req, res) {}
import { Doctor } from "../schema/Doctor";
import { Patient } from "../schema/Patient";
import { MedicalInfo } from "../schema/MedicalInfo";
import { TypeDoctor, TypeMedicalInfo } from "../../types/types";

async function createDoctorModel(doctor:TypeDoctor) {
  try {
    const newDoctor = await Doctor.create(doctor);
    return newDoctor;
  } catch (error) {
    throw new Error;
  }
}

async function getDoctorModel(id:string) {
  try {
    const doctor = await Doctor.findOne({where: {id:id}});
    return doctor;
  } catch (error) {
    throw new Error;
  }
}

async function getDoctorsModel() {
  try {
    const doctors = await Doctor.findAll();
    return doctors;
  } catch (error) {
    throw new Error;
  }
}

async function createMedicalInfoModel(newMedicalInfo: TypeMedicalInfo, patientId:string) {
  try {
    const patient = await Patient.findOne({where:{id: patientId}}) as Patient
    const medicalInfo = await MedicalInfo.create(newMedicalInfo)
    patient.medicalInfo = medicalInfo
    patient.save()
    return patient
  } catch (error) {
    throw new Error
  }
}

async function createPatientSummaryModel(newPatientSummary:string, patientId:string) {
  try {
    const patient = await Patient.findOne({where:{id: patientId}}) as Patient
    patient.summary = newPatientSummary
    await patient.save()
    return patient
  } catch (error) {
    throw new Error
  }
}

export {
  createDoctorModel,
  getDoctorModel,
  getDoctorsModel,
  createMedicalInfoModel,
  createPatientSummaryModel
}