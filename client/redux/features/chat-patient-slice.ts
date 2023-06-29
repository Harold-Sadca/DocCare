import { TypeChatPatient } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: CurrentPatientState;
};

type CurrentPatientState = {
  id?: string;
  name: string;
};
const initialState = {
  value: {
    id: '',
    name: ''
  } as CurrentPatientState,
} as InitialState;

export const chatPatient = createSlice({
  name: 'chatPatient',
  initialState,
  reducers: {
    setChatPatient: (state, action: PayloadAction<TypeChatPatient>) => {
      const {
        id,
        name
      } = action.payload;
      return {
        value: {
          id,
          name
        },
      };
    },
  },
});

export const { setChatPatient } = chatPatient.actions;
export default chatPatient.reducer;
