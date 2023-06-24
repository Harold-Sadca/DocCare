// async function createPatient(req, res) {}
// async function getPatient(req, res) {}
// async function getPatients(req, res) {}
// async function updatePatient(req, res) {}
// async function deletePatient(req, res) {}
// async function getLastCheckup(req, res) {}

import { Patient } from "../schema/Patient";
import { TypePatient } from "../../types/types";

async function createPatientModel(patient:TypePatient) {
  try {
    const newPatient = await Patient.create(patient);
    return newPatient;
  } catch (error) {
    throw new Error;
  }
}

async function getPatientModel(id:string) {
  try {
    const patient = await Patient.findOne({where: {id: id }});
    return patient;
  } catch (error) {
    throw new Error;
  }
}

async function getPatientsModel() {
  try {
    const patients = await Patient.findAll();
    return patients;
  } catch (error) {
    throw new Error;
  }
}


export  {
  createPatientModel,
  getPatientModel,
  getPatientsModel,
}