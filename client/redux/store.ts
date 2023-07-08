import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import currentPatientReducer from './features/patient-slice';
import currentDoctorReducer from './features/doctor-slice';
import chatPatientReducer from './features/chat-patient-slice';
import currentJuniorReducer from './features/junior-slice';
import toggleDisplayChat from './features/display-chat';
import toggleDisplaySection from './features/display-section';
import setAllPatientReducer from './features/all-patients-slice';
import patientToViewReducer from './features/patient-to-view-slice';
import allMessagesReducer from './features/messages-slice';
import AvailableSpecialist from './features/available-doctors-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import searchPatientReducer from './features/search-patient-slice';
import filteredPatientsReducer from './features/search-patient-slice';
import appointmentReducer from './features/appointment-slice';

export const store = configureStore({
  reducer: {
    authReducer,
    currentPatientReducer,
    currentDoctorReducer,
    chatPatientReducer,
    AvailableSpecialist,
    currentJuniorReducer,
    toggleDisplayChat,
    toggleDisplaySection,
    setAllPatientReducer,
    patientToViewReducer,
    patients: searchPatientReducer,
    filteredPatients: filteredPatientsReducer,
    allMessagesReducer,
    appointment: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
