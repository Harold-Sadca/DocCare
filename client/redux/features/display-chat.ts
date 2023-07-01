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
    toggleDisplayChat: (state) => {
      console.log('hello')
      // console.log(state.value)
      state.value = true;
    },
  },
});

export const { toggleDisplayChat } = displayChat.actions;
export default displayChat.reducer;
