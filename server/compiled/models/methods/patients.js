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
exports.deleteAppointmentModel = exports.createAppointmentModel = exports.deletePatientModel = exports.getLastCheckupModel = exports.updatePatientModel = exports.getPatientsModel = exports.getPatientModel = exports.createPatientModel = void 0;
const Patient_1 = require("../schema/Patient");
const Appointment_1 = require("../schema/Appointment");
function createPatientModel(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newPatient = yield Patient_1.Patient.create(patient);
            return newPatient;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createPatientModel = createPatientModel;
function getPatientModel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = yield Patient_1.Patient.findOne({ where: { id: id } });
            return patient;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getPatientModel = getPatientModel;
function getPatientsModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patients = yield Patient_1.Patient.findAll();
            return patients;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getPatientsModel = getPatientsModel;
function updatePatientModel(patientId, updatedPatient) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = yield Patient_1.Patient.findOne({ where: { id: patientId } });
            patient === null || patient === void 0 ? void 0 : patient.set(updatedPatient);
            yield (patient === null || patient === void 0 ? void 0 : patient.save());
            return patient;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.updatePatientModel = updatePatientModel;
function deletePatientModel(patientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const patient = yield Patient_1.Patient.findOne({ where: { id: patientId } });
            yield (patient === null || patient === void 0 ? void 0 : patient.destroy());
            return patient;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.deletePatientModel = deletePatientModel;
function getLastCheckupModel(patientId) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //     patient -> appointments -> attended (true) -> get the last date
            // -> medical-info -> get the notes
            const patient = yield Patient_1.Patient.findOne({ where: { id: patientId } });
            const appointmentsAttended = (_a = patient === null || patient === void 0 ? void 0 : patient.patientAppointments) === null || _a === void 0 ? void 0 : _a.filter((appointment) => appointment.attended);
            const doctorNote = (_b = patient === null || patient === void 0 ? void 0 : patient.medicalInfo) === null || _b === void 0 ? void 0 : _b.doctorNotes;
            const sortedAppointments = appointmentsAttended === null || appointmentsAttended === void 0 ? void 0 : appointmentsAttended.sort((a, b) => {
                const datesA = a.date;
                const datesB = b.date;
                const dateA = new Date(datesA[0]);
                const dateB = new Date(datesB[0]);
                return dateA.getTime() - dateB.getTime();
            });
            const lastDate = sortedAppointments[0];
            return { doctorNote, lastDate };
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getLastCheckupModel = getLastCheckupModel;
function createAppointmentModel(appointment) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newAppointment = yield Appointment_1.Appointment.create(appointment);
            return newAppointment;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.createAppointmentModel = createAppointmentModel;
function deleteAppointmentModel(appointmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const appointment = yield Appointment_1.Appointment.findOne({
                where: { id: appointmentId },
            });
            yield (appointment === null || appointment === void 0 ? void 0 : appointment.destroy());
            return appointment;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.deleteAppointmentModel = deleteAppointmentModel;
