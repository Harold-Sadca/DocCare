/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import '.././junior-doctor.css';
import apiService from '@/services/APIservices';
import { useEffect, useState } from 'react';
import { TypePatient } from '../../../../server/types/types';
import AllPatients from './patients';
import AuthNavbar from '@/app/(components)/auth-navbar';

export default function JuniorDoctorDashBoard() {
  const [allPatients, setAllPatients] = useState<TypePatient[]>([]);

  async function getPatients(token: string) {
    const patients = await apiService.getAllPatients(token);
    setAllPatients(patients as TypePatient[]);
  }

  useEffect(() => {
    const token =
      typeof window !== 'undefined' &&
      (localStorage.getItem('accessToken') as string);
    const userType =
      typeof window !== 'undefined' &&
      (window.localStorage.getItem('userType') as string);
    if (token && userType === 'junior-doctor') {
      getPatients(token);
    }
  }, []);

  return (
    <main>
      <AuthNavbar user={'junior-doctor'} auth={'login'} />
      <h1>Junior DashBoard</h1>
      <AllPatients allPatients={allPatients} />
      <div className='chat-box'>
        {/* <JuniorDoctorMessages currentJunior={junior as TUser} /> */}
      </div>
    </main>
  );
}
