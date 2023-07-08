import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: boolean;
};

const initialState: InitialState = {
  value: false,
};

export const displayChat = createSlice({
  name: 'displayChat',
  initialState,
  reducers: {
    toggleDisplayChat: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleDisplayChat } = displayChat.actions;
export default displayChat.reducer;
