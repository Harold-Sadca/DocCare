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
exports.getMessages = exports.sendMessage = void 0;
const messages_1 = require("../models/methods/messages");
function sendMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // TODO:
            // change based on the population
            // route: /:id of the sender
            // body: id of the receiver
            const { senderId } = req.params;
            const { content, sender_id, sender_name, receiver_id, receiver_name, date, } = req.body;
            const newMessage = {
                content,
                sender_id,
                sender_name,
                receiver_id,
                receiver_name,
                date,
            };
            const createMessage = yield (0, messages_1.sendMessageModel)(newMessage);
            res.status(201).json({
                message: 'Message sent successfully',
                result: createMessage,
            });
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to send a message' });
        }
    });
}
exports.sendMessage = sendMessage;
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = yield (0, messages_1.getMessagesModel)();
            res.status(200).send(message);
        }
        catch (error) {
            res.status(400).json({ error: 'Failed to get the messages' });
        }
    });
}
exports.getMessages = getMessages;
