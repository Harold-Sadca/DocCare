/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Profile from './(dashboard)/profile';
import Appointments from './(dashboard)/appointments';
import Prescriptions from './(dashboard)/prescriptions';
import DoctorList from './(dashboard)/doctor-list';
import AuthNavbar from '@/app/(components)/auth-navbar';
import PatientMessages from './(dashboard)/patient-messages';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import LoadingSpinner from '@/app/(components)/loading';
import { getAccessToken, getUserType } from '@/app/helper';
import '../css/globals.css';
import '../css/patient.css';

export default function Patient() {
  const router = useRouter();
  const [loaded, setLoaded] = useState<Boolean>(false);
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const { id } = currentPatient;

  useEffect(() => {
    const userType = getUserType();
    const token = getAccessToken();
    if (!userType || userType !== 'patient' || !token) {
      router.push('/home');
    }
  }, []);

  useEffect(() => {
    if (id) setLoaded(true);
  }, [id]);

  return (
    <div>
      <AuthNavbar user={'patient'} auth={'login'} />
      {loaded ? (
        <main className='grid-container'>
          <Profile />
          <Appointments />
          <Prescriptions />
          <DoctorList />
          <PatientMessages />
        </main>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
