'use client';
import Profile from './(dashboard)/profile';
import AuthNavbar from '@/app/(components)/auth-navbar';
import Patients from './(dashboard)/patients';
import Appointments from './(dashboard)/appointments';
import '../css/globals.css';
import '../css/doctor.css';
import { useAppSelector } from '@/redux/store';
import LoadingSpinner from '@/app/(components)/loading';
import { useEffect, useState } from 'react';

export default function Doctor() {
  const [loaded, setLoaded] = useState<Boolean>(false);
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const { name } = currentDoctor;

  useEffect(() => {
    if (name !== '') {
      setLoaded(true);
    }
  }, [name]);

  return (
    <div>
      <AuthNavbar user={'doctor'} auth={'login'} />
      {loaded ? (
        <main className='grid-container'>
          <Profile />
          <Patients />
          <Appointments />
        </main>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
