import { TypePatient } from '@/../server/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: CurrentPatientState;
};

type CurrentPatientState = {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  allergies: string;
  bloodType: string;
  medications: string;
  surgicalHistory: string;
  familyMedicalHistory: string;
};
const initialState = {
  value: {
    id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    allergies: '',
    bloodType: '',
    medications: '',
    surgicalHistory: '',
    familyMedicalHistory: '',
  } as CurrentPatientState,
} as InitialState;

export const currentPatient = createSlice({
  name: 'currentPatient',
  initialState,
  reducers: {
    // getCurrentPatient: (state) => {
    //   return state;
    // },
    setCurrentPatient: (state, action: PayloadAction<TypePatient>) => {
      const {
        id,
        name,
        email,
        password,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
        allergies,
        bloodType,
        medications,
        surgicalHistory,
        familyMedicalHistory,
      } = action.payload;
      return {
        value: {
          id,
          name,
          email,
          password,
          phoneNumber,
          address,
          dateOfBirth,
          gender,
          allergies,
          bloodType,
          medications,
          surgicalHistory,
          familyMedicalHistory,
        },
      };
    },
  },
});

export const { setCurrentPatient } = currentPatient.actions;
export default currentPatient.reducer;
