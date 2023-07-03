"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
class Message extends sequelize_1.Model {
    static initModel(sequelize) {
        Message.init({
            id: {
                type: sequelize_1.DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            content: {
                type: sequelize_1.DataTypes.STRING
            },
            sender_id: {
                type: sequelize_1.DataTypes.STRING
            },
            sender_name: {
                type: sequelize_1.DataTypes.STRING
            },
            receiver_id: {
                type: sequelize_1.DataTypes.STRING
            },
            receiver_name: {
                type: sequelize_1.DataTypes.STRING
            },
            date: {
                type: sequelize_1.DataTypes.DATEONLY,
                defaultValue: sequelize_1.DataTypes.NOW
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE
            }
        }, {
            hooks: {
                beforeValidate: (message) => {
                    message.id = (0, uuid_1.v4)();
                }
            },
            sequelize
        });
        return Message;
    }
}
exports.Message = Message;
