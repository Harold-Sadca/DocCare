'use client';
import Profile from './profile';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useRouter } from 'next/navigation';
import Patients from './patients';
import Appointments from './appointments';

export default function Doctor() {
  return (
    <div>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <main className='grid-container'>
        <div className='profile-box'>
          <Profile />
        </div>
        <div className='patients-box'>
          <Patients />
        </div>
        <div className='appointments-box'>
          <Appointments />
        </div>
      </main>
    </div>
  );
}
