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
import {addAppointment} from '@/redux/features/appointmentSlice';

export default function AvailableDoctorList() {
  const router = useRouter();
  const appointments = useAppSelector((state) => state.appointment.appointments);


  const handleButtonClick = () => {
    router.push('/patient/dashboard');
  };

  return (
    <div>
      <AuthNavbar user={'patient'} auth={'login'} />
      <h1>You confirmed</h1>
      <div>
        {appointments.map((appointment, index) => (
          <div key={index}>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Illness: {appointment.illness}</p>
          </div>
        ))}
      </div>
      <button onClick={handleButtonClick}>Go to Dashboard</button>
    </div>
  );
}