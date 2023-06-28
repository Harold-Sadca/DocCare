import { TypeJuniorDoctor } from '@/../server/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: CurrentJuniorState;
};

type CurrentJuniorState = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  licenseNumber: string;
  gender: string;
  userType?: string;
};
const initialState = {
  value: {
    id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    licenseNumber: '',
    gender: '',
  } as CurrentJuniorState,
} as InitialState;

export const currentJunior = createSlice({
  name: 'currentJunior',
  initialState,
  reducers: {
    setCurrentJunior: (state, action: PayloadAction<TypeJuniorDoctor>) => {
      const {
        id,
        name,
        email,
        password,
        phoneNumber,
        address,
        licenseNumber,
        gender,
        userType
      } = action.payload;
      return {
        value: {
          id,
          name,
          email,
          password,
          phoneNumber,
          address,
          licenseNumber,
          gender,
          userType
        },
      };
    },
  },
});

export const { setCurrentJunior } = currentJunior.actions;
export default currentJunior.reducer;
