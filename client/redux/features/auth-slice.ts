import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  userType: string;
};
const initialState = {
  value: {
    isAuth: false,
    userType: ''
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          userType: action.payload
        },
      };
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
