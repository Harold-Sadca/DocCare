import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
  isDoctor: boolean;
  isPatient: boolean;
  isJuniorDoctor: boolean;
};
const initialState = {
  value: {
    isAuth: false,
    username: '',
    uid: '',
    isDoctor: false,
    isPatient: false,
    isJuniorDoctor: false,
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
          username: action.payload,
          uid: 'todo',
          isDoctor: false,
          isPatient: false,
          isJuniorDoctor: false,
        },
      };
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
