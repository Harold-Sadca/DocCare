import { Request, Response } from 'express';
import {
  createJuniorDoctorModel,
  getJuniorDoctorModel,
  createJuniorNoteModel,
} from '../models/methods/junior-doctors';
import { JuniorDoctor } from '../models/schema/JuniorDoctor';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      profilePicture,
    } = req.body;

    const newJuniorDoctor = {
      name,
      email,
      password,
      phoneNumber,
      address,
      licenseNumber,
      gender,
      profilePicture,
      userType: 'junior-doctor',
    };
    const createJuniorDoctor = await createJuniorDoctorModel(newJuniorDoctor);
    const accessToken = jwt.sign({ id: createJuniorDoctor.id }, SECRET_KEY);
    res.status(201).json({
      message: 'Junior doctor account created successfully',
      result: createJuniorDoctor,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a junior doctor account' });
  }
}

async function loginJuniorDoctor(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const juniorDoctor = await JuniorDoctor.findOne({ where: { email } });
    if (!juniorDoctor || juniorDoctor.password === null) {
      res.status(401).json({ error: 'Password and email do not match' });
    } else {
      const validatedPass = await bcrypt.compare(
        password,
        juniorDoctor.password
      );
      if (validatedPass) {
        const accessToken = jwt.sign({ id: juniorDoctor.id }, SECRET_KEY);
        const userAuthenticated = await getJuniorDoctorModel(juniorDoctor.id);
        userAuthenticated!.password = null;
        res.status(200).json({
          message: `Welcome, ${juniorDoctor?.name}!`,
          result: { accessToken, userAuthenticated },
        });
      }
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to login' });
  }
}

async function getJuniorDoctor(req: Request, res: Response) {
  try {
    const auth = req.juniorDoctor;
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
    const patientId = req.params.patientId;
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

//Very well done Ati- Ali <3
