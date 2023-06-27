import { TypeMessage } from '../../types/types';
import db from '../schema/index';

const MessageDB = db.Message;

async function sendMessageModel(message: TypeMessage) {
  try {
    const newMessage = await MessageDB.create(message)
    return newMessage
  } catch (error) {
    throw new Error();
  }
}

async function getMessagesModel() {
  try {
    const messages = await MessageDB.findAll();
    return messages;
  } catch (error) {
    throw new Error();
  }
}

export { sendMessageModel, getMessagesModel };


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