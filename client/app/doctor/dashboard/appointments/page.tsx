/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { TypePatient } from '@/../server/types/types';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { calculateAge } from '@/app/helper';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './appointment-list.css'

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;

  return (
    <main className='main-page'>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <div className='appointment-list-container'>
      <h2>All my appointments</h2>
        {appointments?.map((appointment, idx) => (
             <div className='appoinment-list'>
          <div key={idx} className='each-appointment'>
            <div className='about-patient'>
            <p id='name'>{appointment?.patientAppointment?.name}</p>
            <p>
              {' '}
              {calculateAge(
                appointment?.patientAppointment?.dateOfBirth as string
              ).toString()}{' '}
              years old
            </p>
            <p>{appointment?.patientAppointment?.gender}</p>
            <p>Summary: {appointment?.patientAppointment?.summary}</p>
            </div>
            <div className='appoitment-patient'>
            <h3>Appoitment</h3>
            <p> Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            </div>
          </div>
            </div>
        ))}
      </div>
      <img src='/appointment-vector.png' id='appointment-vector'></img>
      </main>
  );
}


