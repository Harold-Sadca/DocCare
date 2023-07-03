'use client';
import './dashboard.css';
import Profile from './profile';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Patients from './patients';
import Appointments from './appointments';
import { useAppSelector } from '@/redux/store';
import LoadingSpinner from '@/app/(components)/loading';

// import Cal from './calendar'

export default function Doctor() {
  const router = useRouter();
  const [loaded, setLoaded] = useState<Boolean>(false)
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const {name} = currentDoctor

  useEffect(() => {
    if (name !== '') {
      setLoaded(true)
    }
  }, [name])

  return (
    <div>
      <AuthNavbar user={'doctor'} auth={'login'} />
      {loaded? (<main className='grid-container'>
        <div className='profile-box'>
          <Profile />
        </div>
        <div className='patients-box'>
          <Patients />
        </div>
        <div className='appointments-box'>
          <Appointments />
        </div>
      </main>) : <LoadingSpinner />}
    </div>
  );
}
