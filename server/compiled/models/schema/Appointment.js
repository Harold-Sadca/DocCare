"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
class Appointment extends sequelize_1.Model {
    static initModel(sequelize) {
        Appointment.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            date: {
                type: sequelize_1.DataTypes.DATEONLY
            },
            time: {
                type: sequelize_1.DataTypes.DATE
            },
            attended: {
                type: sequelize_1.DataTypes.BOOLEAN
            },
            illness: {
                type: sequelize_1.DataTypes.STRING
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE
            }
        }, {
            sequelize
        });
        return Appointment;
    }
}
exports.Appointment = Appointment;
