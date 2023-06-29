import {
  TypeAppointment,
  TypeDoctor,
  TypePatient,
} from '@/../server/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: CurrentDoctorState;
};

type CurrentDoctorState = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  about: string;
  gender: string;
  doctorAppointments: TypeAppointment[] | undefined;
  patients: TypePatient[] | undefined;
};

const initialState = {
  value: {
    id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    about: '',
    gender: '',
    doctorAppointments: [],
    patients: [],
  } as CurrentDoctorState,
} as InitialState;

export const currentDoctor = createSlice({
  name: 'currentDoctor',
  initialState,
  reducers: {
    setCurrentDoctor: (state, action: PayloadAction<TypeDoctor>) => {
      const {
        id,
        name,
        email,
        password,
        phoneNumber,
        address,
        about,
        gender,
        doctorAppointments,
        patients,
      } = action.payload;
      return {
        value: {
          id,
          name,
          email,
          password,
          phoneNumber,
          address,
          about,
          gender,
          doctorAppointments,
          patients,
        },
      };
    },
  },
});

export const { setCurrentDoctor } = currentDoctor.actions;
export default currentDoctor.reducer;
