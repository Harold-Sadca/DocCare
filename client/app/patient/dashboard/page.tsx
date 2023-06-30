/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Profile from './profile';
import Appointments from './appointments';
import Prescriptions from './prescriptions';
import DoctorList from './doctor-list';
import AuthNavbar from '@/app/(components)/auth-navbar';
import PatientMessages from './patient-messages';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Patient() {
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('accessToken');
    if (!userType || userType !== 'patient' || !token) {
      router.push('/home');
    }
  }, []);

  return (
    <div>
      <AuthNavbar user={'patient'} auth={'login'} />
      <main className='grid-container'>
        <Profile />
        <Appointments />
        <Prescriptions />
        <DoctorList />
        <PatientMessages />
      </main>
    </div>
  );
}
