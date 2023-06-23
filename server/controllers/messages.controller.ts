import { Express, Request, Response } from 'express';
import {
  createMessageModel,
  getMessagesModel,
} from '../models/methods/messages.ts';

async function sendMessage(req: Request, res: Response) {
  try {
    const {
      content,
      sender_id,
      sender_name,
      receiver_id,
      receiver_name,
      date,
    } = req.body;
    const newMessage = {
      content,
      sender_id,
      sender_name,
      receiver_id,
      receiver_name,
      date,
    };
    const createMessage = await createMessageModel(newMessage);
    res.status(201).json({
      message: 'Message sent successfully',
      result: createMessage,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to send a message' });
  }
}
async function getMessages(req: Request, res: Response) {
  try {
    const message = await getMessagesModel();
    res.status(200).send(message);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get the messages' });
  }
}

export { sendMessage, getMessages };
