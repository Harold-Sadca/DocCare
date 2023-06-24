"use strict";
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
exports.getLastCheckup = exports.deletePatient = exports.updatePatient = exports.getPatients = exports.getPatient = exports.createPatient = void 0;
const patients_ts_1 = require("../models/methods/patients.ts");
function createPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phoneNumber, address, date_birth, gender } = req.body;
            const newPatient = {
                name,
                email,
                password,
                phoneNumber,
                address,
                date_birth,
                gender,
            };
            const createPatient = yield (0, patients_ts_1.createPatientModel)(newPatient);
            res.status(201).json({
                message: 'Patient account created successfully',
                result: createPatient,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a patient account' });
        }
    });
}
exports.createPatient = createPatient;
function getPatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const patient = yield (0, patients_ts_1.getPatientModel)(id);
            res.status(200).json({
                message: `Welcome, ${patient.name}!`,
                result: patient,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get the patient account' });
        }
    });
}
exports.getPatient = getPatient;
function getPatients(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patients = yield (0, patients_ts_1.getPatientsModel)();
            res.status(200).send(patients);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get patients account' });
        }
    });
}
exports.getPatients = getPatients;
function updatePatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.updatePatient = updatePatient;
function deletePatient(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.deletePatient = deletePatient;
function getLastCheckup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //     patient -> appointments -> attended (true) -> get the last date
            // -> medical-info -> get the notes
            const id = req.params.id;
            const patientLastCheckup = yield (0, patients_ts_1.getLastCheckupModel)(id);
            res.status(200).send(patientLastCheckup);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get patient last checkup' });
        }
    });
}
exports.getLastCheckup = getLastCheckup;
