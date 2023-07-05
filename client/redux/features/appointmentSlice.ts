import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
  date: string;
  time: string;
  illness: string;
}

interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
  },
});

export const { addAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;
