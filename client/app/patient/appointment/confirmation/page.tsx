/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import '../../../css/patient.css';
import '../../../css/globals.css';

export default function AvailableDoctorList() {
  const router = useRouter();
  const appointment = useAppSelector((state) => state.appointment.value);

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
        onClick={() => router.push('/patient')}
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
