import { Express, Request, Response } from 'express';
import {
  createJuniorDoctorModel,
  getJuniorDoctorModel,
  createJuniorNoteModel,
} from '../models/methods/junior-doctors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/schema/index';
import logger from '../logger';
import { JuniorDoctor } from '../models/schema/JuniorDoctor';
const JuniorDoctorDB = db.JuniorDoctor;
const saltRounds = 12;
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

async function createJuniorDoctor(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      licenseNumber,
      gender,
    } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newJuniorDoctor = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      licenseNumber,
      gender,
    };
    const createJuniorDoctor = await createJuniorDoctorModel(newJuniorDoctor);
    const accessToken = jwt.sign({ id: createJuniorDoctor.id }, SECRET_KEY);
    console.log(createJuniorDoctor);
    console.log(accessToken);
    res.status(201).json({
      message: 'Junior doctor account created successfully',
      result: { createJuniorDoctor, accessToken },
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a junior doctor account' });
  }
}

async function loginJuniorDoctor(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    // console.log(req.body);
    // console.log(email);
    const juniorDoctor = await JuniorDoctor.findOne({
      where: { email },
    });
    console.log('here!');
    console.log({ juniorDoctor });
    if (!juniorDoctor) {
      console.log('Junior doctor not found');
      throw new Error('Junior doctor not found');
    }
    const juniorDoctorPassword = juniorDoctor.password;
    if (juniorDoctorPassword === null) {
      throw new Error('Invalid credentials');
    }
    const validatedPass = await bcrypt.compare(password, juniorDoctorPassword);
    if (!validatedPass) {
      throw new Error('Invalid credentials');
    }
    const accessToken = jwt.sign({ id: juniorDoctor.id }, SECRET_KEY);
    console.log(accessToken);
    // const juniorDoctorAuthenticated = await getJuniorDoctorModel(
    //   juniorDoctor.id
    // );
    // console.log(juniorDoctorAuthenticated);
    res.status(200).json({
      message: `Welcome, ${juniorDoctor?.name}!`,
      result: { accessToken, juniorDoctor },
    });
  } catch (error) {
    res.status(401).send({ error: 'Username or password is incorrect' });
  }
}

async function getJuniorDoctor(req: Request, res: Response) {
  try {
    console.log(req);
    const auth = req.juniorDoctor;
    console.log(auth);
    const id = auth?.id as string;
    const juniorDoctor = await getJuniorDoctorModel(id);
    res.status(200).send(juniorDoctor);
  } catch (error) {
    res.status(400).json({ error: 'Failed to get the junior doctor account' });
  }
}
async function createJuniorNote(req: Request, res: Response) {
  try {
    const juniorNote = req.body;
    const patientId = req.params.id;
    const createJuniorNote = await createJuniorNoteModel(juniorNote, patientId);
    res.status(201).json({
      message: 'Junior note created successfully',
      result: createJuniorNote,
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a junior note' });
  }
}

export {
  createJuniorDoctor,
  getJuniorDoctor,
  createJuniorNote,
  loginJuniorDoctor,
};
