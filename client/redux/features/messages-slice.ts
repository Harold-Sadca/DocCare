import { TypeMessage } from '@/../server/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: MessagesState;
};

type MessagesState = TypeMessage[]
const initialState = {
  value: [] as MessagesState,
} as InitialState;

export const allMessages = createSlice({
  name: 'allMessages',
  initialState,
  reducers: {
    setAllMessages: (state, action: PayloadAction<TypeMessage[]>) => {
      const patients = action.payload;
      return {
        value: patients
      };
    },
  },
});

export const { setAllMessages } = allMessages.actions;
export default allMessages.reducer;