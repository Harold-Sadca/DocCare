'use client';
import Profile from './profile';
import AuthNavbar from '@/app/(components)/auth-navbar';
import Patients from './patients';
import Appointments from './appointments';
import '../../css/globals.css';
import '../../css/doctor.css';

export default function Doctor() {
  return (
    <div>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <main className='grid-container'>
        <Profile />
        <Patients />
        <Appointments />
      </main>
    </div>
  );
}
