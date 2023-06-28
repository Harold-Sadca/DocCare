'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Patients() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const patients = currentDoctor.patients;
  console.log('hello from /patients');

  return (
    <main>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <h2>My patients</h2>
      <div className='patients'>
        {patients?.slice(0, 3).map((patient, idx) => (
          <div key={idx}>
            <p>{patient.name}</p>
            <Link
              href={`/doctor/dashboard/patients/${patient.id}`}
              className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded'
            >
              See patient
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
