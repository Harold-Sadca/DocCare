"use strict";
// async function createPatient(req, res) {}
// async function getPatient(req, res) {}
// async function getPatients(req, res) {}
// async function updatePatient(req, res) {}
// async function deletePatient(req, res) {}
// async function getLastCheckup(req, res) {}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Patient_1 = require("../schema/Patient");
function createPatientModel(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newPatient = yield Patient_1.Patient.create(patient);
            return newPatient;
        }
        catch (error) {
            throw new Error;
        }
    });
}
function getPatientModel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = yield Patient_1.Patient.findOne({ where: { id: id } });
            return patient;
        }
        catch (error) {
            throw new Error;
        }
    });
}
function getPatientsModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patients = yield Patient_1.Patient.findAll();
            return patients;
        }
        catch (error) {
            throw new Error;
        }
    });
}
