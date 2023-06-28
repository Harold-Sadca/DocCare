import { TypeDoctor } from '@/../server/types/types';
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
  } as CurrentDoctorState,
} as InitialState;

export const currentDoctor = createSlice({
  name: 'currentDoctor',
  initialState,
  reducers: {
    setCurrentDoctor: (state, action: PayloadAction<TypeDoctor>) => {
      const { id, name, email, password, phoneNumber, address, about, gender } =
        action.payload;
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
        },
      };
    },
  },
});

export const { setCurrentDoctor } = currentDoctor.actions;
export default currentDoctor.reducer;
