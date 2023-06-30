import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import currentPatientReducer from './features/patient-slice';
import currentDoctorReducer from './features/doctor-slice';
import chatPatientReducer from './features/chat-patient-slice';
import currentJuniorReducer from './features/junior-slice';
import AvailableSpecialist from './features/available-doctors-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
export const store = configureStore({
  reducer: {
    authReducer,
    currentPatientReducer,
    currentDoctorReducer,
    chatPatientReducer,
    AvailableSpecialist,
    currentJuniorReducer
  },
});
// type of store:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;