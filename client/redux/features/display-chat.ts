import { TypeAvailableSpecialist } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: Boolean;
};

const initialState = {
  value: false } as InitialState
export const displayChat = createSlice({
  name: 'displayChat',
  initialState,
  reducers: {
    setDisplayChat: (
      state,
      action: PayloadAction<Boolean>
    ) => {
      const displayChat = action.payload;
      state.value = displayChat;
    },
  },
});

export const { setDisplayChat } = displayChat.actions;
export default displayChat.reducer;
