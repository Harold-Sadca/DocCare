'use client';

import './prescriptions.css';
import { useAppSelector } from '@/redux/store';

export default function Prescriptions() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  console.log(currentPatient);
  return (
    <main>
      <div className='prescriptions-container'>
        <h1>Your Medications</h1>
        <div className='each-medication-container'>
          <img src='/medicine-emoji.png' />
          <p>{currentPatient.medications}</p>
        </div>
      </div>
    </main>
  );
}
