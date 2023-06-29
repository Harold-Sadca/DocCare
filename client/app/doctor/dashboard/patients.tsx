'use client';

import { TypePatient } from '@/../server/types/types';
import { useAppSelector } from '@/redux/store';
import apiService from '@/services/APIservices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './patients.css';

export default function Patients() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const patients = currentDoctor.patients;

  return (
    <main>
      <>
        <div className='patients-list-container'>
          <h1>My Patients</h1>
          <div className='patient-list'>
            {patients?.slice(0, 3).map((patient, idx) => (
              <div className='each-patient' key={idx}>
                <p>{patient.name}</p>
              </div>
            ))}
          </div>
          <div className='see-all'>
            <Link
              href='/doctor/dashboard/patients'
              className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded'
              // onClick={() => router.push('/doctor/dashboard/patients')}
            >
              See all
            </Link>
          </div>
        </div>
      </>
    </main>
  );
}
