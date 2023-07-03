/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import './dashboard.css';
import Profile from './profile';
import Appointments from './appointments';
import Prescriptions from './prescriptions';
import DoctorList from './doctor-list';
import AuthNavbar from '@/app/(components)/auth-navbar';
import PatientMessages from './patient-messages';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import LoadingSpinner from '@/app/(components)/loading';

// import Cal from './calendar'

export default function Patient() {
  const router = useRouter();
  const [loaded, setLoaded] = useState<Boolean>(false)
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const { id } = currentPatient;

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    const token = localStorage.getItem('accessToken');
    if (!userType || userType !== 'patient' || !token) {
      router.push('/home');
    }
  }, []);

  useEffect(() => {
    if (id !== '') {
      console.log(id)
      setLoaded(true)
    }
  }, [id])

  return (
    <div>
      <AuthNavbar user={'patient'} auth={'login'} />
      {loaded ? (<main className='grid-container'>
        <div className='profile-box'>
          <Profile />
        </div>
        <div className='appointment-box'>
          <Appointments />
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
      </main>) : <LoadingSpinner />}
    </div>
  )
}
