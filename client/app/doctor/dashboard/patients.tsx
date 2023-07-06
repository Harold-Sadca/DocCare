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
    <main className='doctor-patients-box'>
      <div className='dashboard-container doctor-patients-container'>
        <h3>My Patients</h3>
        {patients?.slice(0, 3).map((patient, idx) => (
          <Link href={`/doctor/dashboard/patients/${patient.id}`} key={idx}>
            <div className='profile-boxes each-item'>
              <Image
                src={patient.profilePicture as string}
                alt='patient-profile'
                width={70}
                height={70}
                className='profile-pic-70 mr-4'
              ></Image>
              <p>{patient.name}</p>
            </div>
          </Link>
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
