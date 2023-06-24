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
exports.createJuniorNoteModel = exports.getJuniorDoctorModel = exports.createJuniorDoctorModel = void 0;
const JuniorDoctor_1 = require("../schema/JuniorDoctor");
const Patient_1 = require("../schema/Patient");
function createJuniorDoctorModel(juniorDoctor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newJuniorDoctor = yield JuniorDoctor_1.JuniorDoctor.create(juniorDoctor);
            return newJuniorDoctor;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createJuniorDoctorModel = createJuniorDoctorModel;
function getJuniorDoctorModel(juniorId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const juniorDoctor = yield JuniorDoctor_1.JuniorDoctor.findOne({
                where: { id: juniorId },
            });
            return juniorDoctor;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getJuniorDoctorModel = getJuniorDoctorModel;
function createJuniorNoteModel(juniorNote, patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = (yield Patient_1.Patient.findOne({
                where: { id: patientId },
            }));
            patient.juniorNotes = juniorNote;
            yield patient.save();
            return patient;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createJuniorNoteModel = createJuniorNoteModel;
