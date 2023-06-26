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
exports.loginJuniorDoctor = exports.createJuniorNote = exports.getJuniorDoctor = exports.createJuniorDoctor = void 0;
const junior_doctors_1 = require("../models/methods/junior-doctors");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../models/schema/index"));
const logger_1 = __importDefault(require("../logger"));
const JuniorDoctorDB = index_1.default.JuniorDoctor;
const saltRounds = 12;
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
function createJuniorDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phoneNumber, address, licenseNumber, gender, } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const newJuniorDoctor = {
                name,
                email,
                password: hashedPassword,
                phoneNumber,
                address,
                licenseNumber,
                gender,
            };
            const createJuniorDoctor = yield (0, junior_doctors_1.createJuniorDoctorModel)(newJuniorDoctor);
            const accessToken = jsonwebtoken_1.default.sign({ id: createJuniorDoctor.id }, SECRET_KEY);
            res.status(201).json({
                message: 'Junior doctor account created successfully',
                result: createJuniorDoctor,
                accessToken,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a junior doctor account' });
        }
    });
}
exports.createJuniorDoctor = createJuniorDoctor;
function loginJuniorDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            console.log(req.body);
            console.log(email);
            const jrDoctor = yield JuniorDoctorDB.findOne({ where: { email: email } });
            logger_1.default.info({ jrDoctor });
            if (!jrDoctor) {
                console.log('Junior doctor not found');
                throw new Error('Junior doctor not found');
            }
            const juniorDoctorPassword = jrDoctor.password;
            if (juniorDoctorPassword === null) {
                throw new Error('Invalid credentials');
            }
            const validatedPass = yield bcrypt_1.default.compare(password, juniorDoctorPassword);
            if (!validatedPass) {
                throw new Error('Invalid credentials');
            }
            const accessToken = jsonwebtoken_1.default.sign({ id: jrDoctor.id }, SECRET_KEY);
            res.status(200).json({
                message: `Welcome, ${jrDoctor === null || jrDoctor === void 0 ? void 0 : jrDoctor.name}!`,
                result: { accessToken, jrDoctor },
            });
        }
        catch (error) {
            res.status(401).send({ error: 'Username or password is incorrect' });
        }
    });
}
exports.loginJuniorDoctor = loginJuniorDoctor;
function getJuniorDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const juniorDoctor = yield (0, junior_doctors_1.getJuniorDoctorModel)(id);
            res.status(200).json({
                message: `Welcome, ${juniorDoctor === null || juniorDoctor === void 0 ? void 0 : juniorDoctor.name}!`,
                result: juniorDoctor,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get the junior doctor account' });
        }
    });
}
exports.getJuniorDoctor = getJuniorDoctor;
function createJuniorNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const juniorNote = req.body;
            const patientId = req.params.id;
            const createJuniorNote = yield (0, junior_doctors_1.createJuniorNoteModel)(juniorNote, patientId);
            res.status(201).json({
                message: 'Junior note created successfully',
                result: createJuniorNote,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a junior note' });
        }
    });
}
exports.createJuniorNote = createJuniorNote;
