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
exports.anyDoctorAuthMiddleware = exports.juniorDoctorAuthMiddleware = exports.doctorAuthMiddleware = exports.patientAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../models/schema/index"));
const DoctorDB = index_1.default.Doctor;
const JuniorDoctorDB = index_1.default.JuniorDoctor;
const PatientDB = index_1.default.Patient;
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
const patientAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders)
        return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];
    try {
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const patient = yield PatientDB.findOne({ where: { id } });
        if (!patient) {
            console.log('no patient!');
            return res.sendStatus(401);
        }
        req.patient = patient;
        next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
});
exports.patientAuthMiddleware = patientAuthMiddleware;
const doctorAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hello from doctor middleware');
    const authHeaders = req.headers['authorization'];
    if (!authHeaders)
        return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];
    try {
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const doctor = yield DoctorDB.findOne({ where: { id } });
        if (!doctor)
            return res.sendStatus(401);
        req.doctor = doctor;
        next();
    }
    catch (error) {
        res.sendStatus(401);
    }
});
exports.doctorAuthMiddleware = doctorAuthMiddleware;
const juniorDoctorAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders)
        return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];
    try {
        console.log(token);
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log(id);
        const juniorDoctor = yield JuniorDoctorDB.findOne({ where: { id } });
        console.log(juniorDoctor);
        if (!juniorDoctor)
            return res.sendStatus(401);
        req.juniorDoctor = juniorDoctor;
        next();
    }
    catch (error) {
        res.sendStatus(401);
    }
});
exports.juniorDoctorAuthMiddleware = juniorDoctorAuthMiddleware;
const anyDoctorAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders)
        return res.sendStatus(403);
    const token = authHeaders.split(' ')[1];
    try {
        const { id } = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const juniorDoctor = yield JuniorDoctorDB.findOne({ where: { id } });
        const doctor = yield DoctorDB.findOne({ where: { id } });
        if (!doctor && !juniorDoctor)
            return res.sendStatus(401);
        if (doctor)
            req.doctor = doctor;
        if (juniorDoctor)
            req.juniorDoctor = juniorDoctor;
        next();
    }
    catch (error) {
        res.sendStatus(401);
    }
});
exports.anyDoctorAuthMiddleware = anyDoctorAuthMiddleware;
