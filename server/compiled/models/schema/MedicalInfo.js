"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalInfo = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
class MedicalInfo extends sequelize_1.Model {
    static initModel(sequelize) {
        MedicalInfo.init({
            id: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            prescription: {
                type: sequelize_1.DataTypes.STRING,
            },
            doctorNote: {
                type: sequelize_1.DataTypes.STRING,
            },
            doctorName: {
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
                beforeValidate: (info) => {
                    info.id = (0, uuid_1.v4)();
                }
            },
            sequelize,
        });
        return MedicalInfo;
    }
}
exports.MedicalInfo = MedicalInfo;
