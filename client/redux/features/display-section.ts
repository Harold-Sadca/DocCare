import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: boolean;
};

const initialState: InitialState = {
  value: true,
};

export const displaySection = createSlice({
  name: 'displaySection',
  initialState,
  reducers: {
    toggleDisplaySection: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleDisplaySection } = displaySection.actions;
export default displaySection.reducer;
