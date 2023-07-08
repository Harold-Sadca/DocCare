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
exports.attendAppointment = exports.loginDoctor = exports.createPatientSummary = exports.createMedicalInfo = exports.getDoctors = exports.getDoctor = exports.createDoctor = void 0;
const doctors_1 = require("../models/methods/doctors");
const Doctor_1 = require("../models/schema/Doctor");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
function createEmptyAvailability() {
    const availability = {};
    const month = {};
    for (let day = 1; day <= 31; day++) {
        month[day] = [];
    }
    for (let monthNum = 1; monthNum <= 12; monthNum++) {
        availability[monthNum] = month;
    }
    return availability;
}
function createDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, specialisation, phoneNumber, address, licenseNumber, gender, about, profilePicture, } = req.body;
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
                profilePicture,
                userType: 'doctor',
                availability: createEmptyAvailability(),
            };
            const createDoctor = yield (0, doctors_1.createDoctorModel)(newDoctor);
            const accessToken = jsonwebtoken_1.default.sign({ id: createDoctor.id }, SECRET_KEY);
            res.status(201).json({
                message: 'Doctor account created successfully',
                result: createDoctor,
                accessToken,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create a doctor account' });
        }
    });
}
exports.createDoctor = createDoctor;
function loginDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const doctor = yield Doctor_1.Doctor.findOne({ where: { email } });
            if (!doctor || doctor.password === null) {
                res.status(401).json({ error: 'Password and email do not match' });
            }
            else {
                const validatedPass = yield bcrypt_1.default.compare(password, doctor.password);
                if (validatedPass) {
                    const accessToken = jsonwebtoken_1.default.sign({ id: doctor.id }, SECRET_KEY);
                    const userAuthenticated = yield (0, doctors_1.getDoctorModel)(doctor.id);
                    userAuthenticated.password = null;
                    res.status(200).json({
                        message: `Welcome, ${doctor === null || doctor === void 0 ? void 0 : doctor.name}!`,
                        result: { accessToken, userAuthenticated },
                    });
                }
            }
        }
        catch (error) {
            res.status(500).send({ error: 'Failed to login' });
        }
    });
}
exports.loginDoctor = loginDoctor;
function getDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const auth = req.doctor;
            const id = auth === null || auth === void 0 ? void 0 : auth.id;
            const doctor = yield (0, doctors_1.getDoctorModel)(id);
            res.status(200).send({
                message: `Welcome, ${doctor === null || doctor === void 0 ? void 0 : doctor.name}!`,
                result: doctor,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to get the doctor account' });
        }
    });
}
exports.getDoctor = getDoctor;
function getDoctors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctors = yield (0, doctors_1.getDoctorsModel)();
            res.status(200).send(doctors);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to get doctors account' });
        }
    });
}
exports.getDoctors = getDoctors;
function createMedicalInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { prescription, doctorNote, doctorName } = req.body;
            const patientId = req.params.patientId;
            const newMedicalInfo = {
                prescription,
                doctorNote,
                doctorName,
            };
            const createMedicalInfo = yield (0, doctors_1.createMedicalInfoModel)(newMedicalInfo, patientId);
            res.status(200).json({
                message: 'Medical info created successfully',
                result: createMedicalInfo,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create a medical info' });
        }
    });
}
exports.createMedicalInfo = createMedicalInfo;
function createPatientSummary(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patientId = req.params.patientId;
            const { newPatientSummary } = req.body;
            const createPatientSummary = yield (0, doctors_1.createPatientSummaryModel)(newPatientSummary, patientId);
            res.status(201).json({
                message: 'Patient summary created successfully',
                result: createPatientSummary,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create a patient summary' });
        }
    });
}
exports.createPatientSummary = createPatientSummary;
function attendAppointment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appointmentId = req.params.appointmentId;
            const attendAppointment = yield (0, doctors_1.attendAppointmentModel)(appointmentId);
            res.status(201).json({
                message: 'Mark appointment as attended successfully',
                result: attendAppointment,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to mark appointment as attended' });
        }
    });
}
exports.attendAppointment = attendAppointment;
