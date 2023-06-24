"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Condition = void 0;
const sequelize_1 = require("sequelize");
class Condition extends sequelize_1.Model {
    static initModel(sequelize) {
        Condition.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            allergies: {
                type: sequelize_1.DataTypes.STRING
            },
            bloodType: {
                type: sequelize_1.DataTypes.STRING
            },
            medications: {
                type: sequelize_1.DataTypes.STRING
            },
            surgicalHistory: {
                type: sequelize_1.DataTypes.STRING
            },
            familyMedicalHistory: {
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
        return Condition;
    }
}
exports.Condition = Condition;
