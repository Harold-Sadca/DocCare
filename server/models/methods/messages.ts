// async function sendMessage(req, res) {}
// async function getMessages(req, res) {}
import { TypeMessage } from "../../types/types";
import { Message } from "../schema/Message";

async function sendMessageModel(message:TypeMessage) {
  try {
    const newMessage = await Message.create(message)
    return newMessage
  } catch (error) {
    throw new Error()
  }
}

async function getMessagesModel() {
  try {
    const messages = await Message.findAll()
    return messages
  } catch (error) {
    throw new Error()
  }
}

export {
  sendMessageModel,
  getMessagesModel
}