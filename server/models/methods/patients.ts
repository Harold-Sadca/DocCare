// async function getPatient(req, res) {}
// async function getPatients(req, res) {}
// async function updatePatient(req, res) {}
// async function deletePatient(req, res) {}
// async function getLastCheckup(req, res) {}

import { Patient } from "../schema/Patient";

async function getPatientModel(id:string) {
  try {
    const patient = await Patient.findOne({where: {id: id }})
    return patient
  } catch (error) {
    throw new Error;
  }
}