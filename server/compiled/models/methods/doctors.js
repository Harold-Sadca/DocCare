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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientSummaryModel = exports.createMedicalInfoModel = exports.getDoctorsModel = exports.getDoctorModel = exports.createDoctorModel = void 0;
const index_1 = __importDefault(require("../schema/index"));
const Appointment_1 = require("../schema/Appointment");
const logger_1 = __importDefault(require("../../logger"));
const DoctorDB = index_1.default.Doctor;
const PatientDB = index_1.default.Patient;
const MedicalInfoDB = index_1.default.MedicalInfo;
function createDoctorModel(doctor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(doctor);
            const newDoctor = yield DoctorDB.create(doctor);
            console.log(newDoctor);
            return newDoctor;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createDoctorModel = createDoctorModel;
function getDoctorModel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = yield DoctorDB.findOne({
                where: { id: id },
                include: {
                    model: Appointment_1.Appointment,
                    as: 'doctorAppointments',
                    required: false,
                },
            });
            return doctor;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getDoctorModel = getDoctorModel;
function getDoctorsModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('working?');
            const doctors = yield DoctorDB.findAll({
                include: {
                    model: Appointment_1.Appointment,
                    as: 'doctorAppointments',
                    required: false,
                },
            });
            console.log(doctors);
            return doctors;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getDoctorsModel = getDoctorsModel;
function createMedicalInfoModel(newMedicalInfo, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = (yield PatientDB.findOne({
                where: { id: patientId },
            }));
            logger_1.default.info(newMedicalInfo);
            const medicalInfo = yield MedicalInfoDB.create(newMedicalInfo);
            logger_1.default.info('here');
            patient.setMedicalInfo(medicalInfo);
            yield medicalInfo.save();
            return medicalInfo;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createMedicalInfoModel = createMedicalInfoModel;
function createPatientSummaryModel(newPatientSummary, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = (yield PatientDB.findOne({
                where: { id: patientId },
            }));
            patient.summary = newPatientSummary;
            yield patient.save();
            return patient;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createPatientSummaryModel = createPatientSummaryModel;
