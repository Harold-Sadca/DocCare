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
exports.createPatientSummary = exports.createMedicalInfo = exports.getDoctors = exports.getDoctor = exports.createDoctor = void 0;
const doctors_ts_1 = require("../models/methods/doctors.ts");
function createDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, specialisation, phoneNumber, address, licenseNumber, gender, about, } = req.body;
            const newDoctor = {
                name,
                email,
                password,
                specialisation,
                phoneNumber,
                address,
                licenseNumber,
                gender,
                about,
            };
            const createDoctor = yield (0, doctors_ts_1.createDoctorModel)(newDoctor);
            res.status(201).json({
                message: 'Doctor account created successfully',
                result: createDoctor,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a doctor account' });
        }
    });
}
exports.createDoctor = createDoctor;
function getDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctorId = req.params.id;
            const doctor = yield (0, doctors_ts_1.getDoctorModel)(doctorId);
            res.status(200).send({
                message: `Welcome, ${doctor.name}!`,
                result: doctor,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get the doctor account' });
        }
    });
}
exports.getDoctor = getDoctor;
function getDoctors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctors = yield (0, doctors_ts_1.getDoctorsModel)();
            res.status(200).send(doctors);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get doctors account' });
        }
    });
}
exports.getDoctors = getDoctors;
function createMedicalInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { prescription, doctor_notes, patientId } = req.body;
            const doctorId = req.params.id;
            const newMedicalInfo = { prescription, doctor_notes, doctorId, patientId };
            const createMedicalInfo = yield (0, doctors_ts_1.createMedicalInfoModel)(newMedicalInfo);
            res.status(201).json({
                message: 'Medical info created successfully',
                result: createMedicalInfo,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a medical info' });
        }
    });
}
exports.createMedicalInfo = createMedicalInfo;
function createPatientSummary(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { patientId, patientSummary, doctorName } = req.body;
            const createPatientSummary = yield (0, doctors_ts_1.createPatientSummaryModel)(patientSummary, patientId, doctorName);
            res.status(201).json({
                message: 'Patient summary created successfully',
                result: createPatientSummary,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a patient summary' });
        }
    });
}
exports.createPatientSummary = createPatientSummary;
