"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
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
                type: sequelize_1.DataTypes.ENUM('Male', 'Female'),
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
        }, { hooks: {
                beforeValidate: (doctor) => {
                    doctor.id = (0, uuid_1.v4)();
                }
            },
            sequelize,
        });
        return Doctor;
    }
}
exports.Doctor = Doctor;
