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
exports.getMessagesModel = exports.sendMessageModel = void 0;
const index_1 = __importDefault(require("../schema/index"));
const MessageDB = index_1.default.Message;
function sendMessageModel(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newMessage = yield MessageDB.create(message);
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
            const messages = yield MessageDB.findAll();
            return messages;
        }
        catch (error) {
            throw new Error();
        }
    });
}
exports.getMessagesModel = getMessagesModel;
// const newMessage = MessageDB.build(message);
// if(sender_type == 'patient') {
//   newMessage.setPatientSent(sender_id)
//   newMessage.setJuniorReceived(receiver_id)
//   await newMessage.save()
// } else {
//   newMessage.setJuniorSent(sender_id)
//   newMessage.setPatientReceived(receiver_id)
//   await newMessage.save()
// }
// return newMessage;
