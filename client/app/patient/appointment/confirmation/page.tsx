/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import '../../../css/patient.css';
import '../../../css/globals.css';
import { useAppSelector } from '@/redux/store';
import apiService from '@/services/APIservices';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { addAppointment } from '@/redux/features/appointment-slice';

export default function AvailableDoctorList() {
  const router = useRouter();
  const appointment = useAppSelector((state) => state.appointment.value);

  const handleButtonClick = () => {
    router.push('/patient');
  };

  return (
    <div className='confirmation'>
      <AuthNavbar user={'patient'} auth={'login'} />
      <h1 className='confirmation-heading'>Confirmation</h1>
      <div>
        <div className='confirmation-info'>
          <h2>Appointment was made for</h2>
          <p>Date: {appointment.date}</p>
          <p>Time: {appointment.time}</p>
          <p>Illness: {appointment.illness}</p>
        </div>
      </div>
      <button
        onClick={handleButtonClick}
        className='bg-tertiary hover:bg-tertiary-dark text-white font-bold py-2 px-4 m-2 rounded'
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
        }}
      >
        Go to my Dashboard
      </button>
    </div>
  );
}
