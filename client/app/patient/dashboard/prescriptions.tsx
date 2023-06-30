'use client';
import Image from 'next/image';
import '../../css/patient.css';
import '../../css/globals.css';
import { useAppSelector } from '@/redux/store';

export default function Prescriptions() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );

  return (
    <main className='patient-dashboard-container prescriptions-container'>
      <h3>Your Medications</h3>
      <div className='each-medication-container'>
        <Image
          src='/medicine-emoji.png'
          alt='medicine-emoji'
          width={100}
          height={100}
        ></Image>
        <p>{currentPatient.medications}</p>
      </div>
    </main>
  );
}
