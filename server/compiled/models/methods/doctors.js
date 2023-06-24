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
exports.createPatientSummaryModel = exports.createMedicalInfoModel = exports.getDoctorsModel = exports.getDoctorModel = exports.createDoctorModel = void 0;
// async function getDoctor(req, res) {}
// async function getDoctors(req, res) {}
// async function createPrescription(req, res) {}
// async function createDoctorNote(req, res) {}
// async function createPatientSummary(req, res) {}
const Doctor_1 = require("../schema/Doctor");
const Patient_1 = require("../schema/Patient");
const MedicalInfo_1 = require("../schema/MedicalInfo");
function createDoctorModel(doctor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newDoctor = yield Doctor_1.Doctor.create(doctor);
            return newDoctor;
        }
        catch (error) {
            throw new Error;
        }
    });
}
exports.createDoctorModel = createDoctorModel;
function getDoctorModel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = yield Doctor_1.Doctor.findOne({ where: { id: id } });
            return doctor;
        }
        catch (error) {
            throw new Error;
        }
    });
}
exports.getDoctorModel = getDoctorModel;
function getDoctorsModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctors = yield Doctor_1.Doctor.findAll();
            return doctors;
        }
        catch (error) {
            throw new Error;
        }
    });
}
exports.getDoctorsModel = getDoctorsModel;
function createMedicalInfoModel(newMedicalInfo, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = yield Patient_1.Patient.findOne({ where: { id: patientId } });
            const medicalInfo = yield MedicalInfo_1.MedicalInfo.create(newMedicalInfo);
            patient.medicalInfo = medicalInfo;
            patient.save();
            return patient;
        }
        catch (error) {
            throw new Error;
        }
    });
}
exports.createMedicalInfoModel = createMedicalInfoModel;
function createPatientSummaryModel(newPatientSummary, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = yield Patient_1.Patient.findOne({ where: { id: patientId } });
            patient.summary = newPatientSummary;
            yield patient.save();
            return patient;
        }
        catch (error) {
            throw new Error;
        }
    });
}
exports.createPatientSummaryModel = createPatientSummaryModel;
