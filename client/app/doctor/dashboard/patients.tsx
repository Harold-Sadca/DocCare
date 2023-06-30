'use client';

import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Patients() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const patients = currentDoctor.patients;

  return (
    <main>
      <div className='dashboard-container patients-list-container doctor-patients-container'>
        <h3>My Patients</h3>
        {patients?.slice(0, 3).map((patient, idx) => (
          <div className='profile-boxes each-item' key={idx}>
            <Image
              src={patient.profilePicture as string}
              alt='patient-profile'
              width={150}
              height={150}
              className='profile-pic'
            ></Image>
            <p>{patient.name}</p>
          </div>
        ))}
        <Link
          href='/doctor/dashboard/patients'
          className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded btn-see-all'
        >
          See all
        </Link>
      </div>
    </main>
  );
}
