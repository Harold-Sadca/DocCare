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
exports.createJuniorNote = exports.getJuniorDoctor = exports.createJuniorDoctor = void 0;
const junior_doctors_ts_1 = require("../models/methods/junior-doctors.ts");
function createJuniorDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, phoneNumber, address, licenseNumber, gender, } = req.body;
            const newJuniorDoctor = {
                name,
                email,
                password,
                phoneNumber,
                address,
                licenseNumber,
                gender,
            };
            const createJuniorDoctor = yield (0, junior_doctors_ts_1.createJuniorDoctorModel)(newJuniorDoctor);
            res.status(201).json({
                message: 'Junior doctor account created successfully',
                result: createJuniorDoctor,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to create a junior doctor account' });
        }
    });
}
exports.createJuniorDoctor = createJuniorDoctor;
function getJuniorDoctor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const juniorDoctor = yield (0, junior_doctors_ts_1.getJuniorDoctorModel)(id);
            res.status(200).json({
                message: `Welcome, ${juniorDoctor.name}!`,
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
            const createJuniorNote = yield (0, junior_doctors_ts_1.createJuniorNoteModel)(juniorNote, patientId);
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
