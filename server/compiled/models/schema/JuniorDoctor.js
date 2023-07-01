"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuniorDoctor = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
class JuniorDoctor extends sequelize_1.Model {
    static initModel(sequelize) {
        JuniorDoctor.init({
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
            licenseNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            phoneNumber: {
                type: sequelize_1.DataTypes.STRING,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
            },
            gender: {
                type: sequelize_1.DataTypes.ENUM('Male', 'Female'),
            },
            profilePicture: {
                type: sequelize_1.DataTypes.STRING,
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
                beforeValidate: (junior) => {
                    junior.id = (0, uuid_1.v4)();
                }
            },
            sequelize,
        });
        return JuniorDoctor;
    }
}
exports.JuniorDoctor = JuniorDoctor;
