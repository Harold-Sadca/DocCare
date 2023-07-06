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
exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const saltRounds = 12;
const bcrypt_1 = __importDefault(require("bcrypt"));
class Doctor extends sequelize_1.Model {
    static initModel(sequelize) {
        Doctor.init({
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
            specialisation: {
                type: sequelize_1.DataTypes.ENUM('General Practice', 'Internal Medicine', 'Pediatrics', 'Obstetrics and Gynecology', 'Surgery', 'Psychiatry', 'Dermatology', 'Ophthalmology', 'Ear Nose and Throat (ENT)', 'Cardiology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology'),
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
            },
            licenseNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            gender: {
                type: sequelize_1.DataTypes.ENUM('Male', 'Female', 'Other'),
            },
            about: {
                type: sequelize_1.DataTypes.STRING,
            },
            profilePicture: {
                type: sequelize_1.DataTypes.STRING,
            },
            userType: {
                type: sequelize_1.DataTypes.STRING,
            },
            availability: {
                type: sequelize_1.DataTypes.JSON,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
            },
        }, {
            hooks: {
                beforeValidate: (doctor) => __awaiter(this, void 0, void 0, function* () {
                    doctor.id = (0, uuid_1.v4)();
                }),
                afterCreate: (doctor) => __awaiter(this, void 0, void 0, function* () {
                    const hashedPassword = yield bcrypt_1.default.hash(doctor.password, saltRounds);
                    doctor.password = hashedPassword;
                    yield doctor.save();
                }),
            },
            sequelize,
        });
        return Doctor;
    }
}
exports.Doctor = Doctor;
