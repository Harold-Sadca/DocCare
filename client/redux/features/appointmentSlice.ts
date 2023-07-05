import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
  date: string;
  time: string;
  illness: string;
}

interface AppointmentState {
  value: Appointment;
}

const initialState: AppointmentState = {
  value: {
    date: '',
    time: '',
    illness: '',
  },
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.value = action.payload;
      return state;
    },
  },
});

export const { addAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
