'use client';
import './dashboard.css';
import Profile from './profile';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// import Cal from './calendar'

export default function Doctor() {
  const router = useRouter();

  console.log('Hey from doctor');

  // useEffect(() => {
  //   const userType = localStorage.getItem('userType');
  //   const token = localStorage.getItem('accessToken');
  //   if (!userType || userType !== 'doctor' || !token) {
  //     router.push('/home');
  //   }
  // }, []);

  return (
    <div>
      {/* <AuthNavbar user={'doctor'} auth={'login'} /> */}
      <main className='grid-container'>
        <div className='profile-box'>
          <Profile />
        </div>
      </main>
    </div>
  );
}
