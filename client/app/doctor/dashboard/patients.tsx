'use client';

import { TypePatient } from '@/../server/types/types';
import { useAppSelector } from '@/redux/store';
import apiService from '@/services/APIservices';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Patients() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const patients = currentDoctor.patients;

  return (
    <main>
      <div className='patients'>
        {patients.slice(0, 3).map((patient, idx) => (
          <div key={idx}>
            <p>{patient.name}</p>
          </div>
        ))}
        <button
          className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded'
          onClick={() => router.push('/doctor/dashboard/patients')}
        >
          See all
        </button>
      </div>
    </main>
  );
}
