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
exports.getMessagesModel = exports.sendMessageModel = void 0;
const Message_1 = require("../schema/Message");
function sendMessageModel(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newMessage = yield Message_1.Message.create(message);
            return newMessage;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.sendMessageModel = sendMessageModel;
function getMessagesModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = yield Message_1.Message.findAll();
            return messages;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getMessagesModel = getMessagesModel;
