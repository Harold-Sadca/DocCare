'use client';
import './dashboard.css';
import Profile from './profile';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Patients from './patients';
import Appointments from './appointments';

// import Cal from './calendar'

export default function Doctor() {
  const router = useRouter();

  return (
    <div>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <main className='grid-container'>
        <div className='profile-box'>
          <Profile />
        </div>
        <div className='profile-box'>
          <Patients />
        </div>
        <div className=''>
          <Appointments />
        </div>
      </main>
    </div>
  );
}
