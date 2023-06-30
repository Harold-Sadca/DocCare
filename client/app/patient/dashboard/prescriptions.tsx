'use client';

import Image from 'next/image';
import './prescriptions.css';
import { useAppSelector } from '@/redux/store';

export default function Prescriptions() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );

  return (
    <main>
      <div className='prescriptions-container'>
        <h1>Your Medications</h1>
        <div className='each-medication-container'>
          <Image src='/medicine-emoji.png' alt='medicine-emoji'
           height={150}
           width={150}></Image>
          <p>{currentPatient.medications}</p>
        </div>
      </div>
    </main>
  );
}
