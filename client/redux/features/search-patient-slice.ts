import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypePatient } from '@/../server/types/types';

interface PatientsState {
  allPatients: TypePatient[];
  filteredPatients: TypePatient[];
}

const initialState: PatientsState = { allPatients: [], filteredPatients: [] };

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setAllPatients: (state, action: PayloadAction<TypePatient[]>) => {
      state.allPatients = action.payload;
    },
    setFilteredPatients: (state, action: PayloadAction<TypePatient[]>) => {
      state.filteredPatients = action.payload;
    },
  },
});

export const { setAllPatients, setFilteredPatients } = patientsSlice.actions;

export default patientsSlice.reducer;
