'use client';
import './dashboard.css';
import Profile from './profile';
import Appoitments from './appoitments';
import Prescriptions from './prescriptions';
import DoctorList from './doctor-list';
import AuthNavbar from '@/app/(components)/auth-navbar';
import PatientMessages from './patient-messages';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import Cal from './calendar'

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
        <div className='profile-box'>
          <Profile />
        </div>
        <div className='appoitment-box'>
          <Appoitments />
        </div>
        <div className='prescriptions-box'>
          <Prescriptions />
        </div>
        <div className='doctor-list-box'>
          <DoctorList />
        </div>
        <div className='patient-messages'>
          <PatientMessages />
        </div>
        {/* <Cal cellRender={cellRender} /> */}
      </main>
    </div>
  );
}
