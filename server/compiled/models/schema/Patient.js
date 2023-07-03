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
exports.Patient = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const saltRounds = 12;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Patient extends sequelize_1.Model {
    static initModel(sequelize) {
        Patient.init({
            id: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
            },
            dateOfBirth: {
                type: sequelize_1.DataTypes.DATEONLY,
            },
            gender: {
                type: sequelize_1.DataTypes.ENUM('Male', 'Female'),
            },
            profilePicture: {
                type: sequelize_1.DataTypes.STRING,
            },
            juniorNotes: {
                type: sequelize_1.DataTypes.STRING,
            },
            summary: {
                type: sequelize_1.DataTypes.STRING,
            },
            allergies: {
                type: sequelize_1.DataTypes.STRING,
            },
            bloodType: {
                type: sequelize_1.DataTypes.STRING,
            },
            medications: {
                type: sequelize_1.DataTypes.STRING,
            },
            surgicalHistory: {
                type: sequelize_1.DataTypes.STRING,
            },
            familyMedicalHistory: {
                type: sequelize_1.DataTypes.STRING,
            },
            status: {
                type: sequelize_1.DataTypes.ENUM('Online', 'Offline'),
            },
            userType: {
                type: sequelize_1.DataTypes.STRING,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            hooks: {
                beforeValidate: (patient) => __awaiter(this, void 0, void 0, function* () {
                    patient.id = (0, uuid_1.v4)();
                    const hashedPassword = yield bcrypt_1.default.hash(patient.password, saltRounds);
                    patient.password = hashedPassword;
                    patient.status = 'Online';
                }),
            },
            sequelize,
        });
        return Patient;
    }
}
exports.Patient = Patient;
