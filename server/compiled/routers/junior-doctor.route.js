"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.juniorDoctorRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const junior_doctor_controller_1 = require("../controllers/junior-doctor.controller");
const app = (0, express_1.default)();
const juniorDoctorRouter = (0, express_2.Router)();
exports.juniorDoctorRouter = juniorDoctorRouter;
juniorDoctorRouter.post('/junior-doctors', junior_doctor_controller_1.createJuniorDoctor);
juniorDoctorRouter.get('/junior-doctors/:id', junior_doctor_controller_1.getJuniorDoctor);
juniorDoctorRouter.post('/junior-doctors/:id/notes', junior_doctor_controller_1.createJuniorNote);
