'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../../css/doctor.css';
import '../../../css/globals.css';
import { LeftCircleOutlined } from '@ant-design/icons';

export default function Patients() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const patients = currentDoctor.patients;
  console.log(patients);
  console.log('hello from /patients');

  return (
    <div className='patients-box'>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <div className='button-and-title'>
        <button onClick={() => router.back()}>
          <LeftCircleOutlined />
        </button>
        <h2 className='text-2xl text-primary text-black m-4'>My patients</h2>
      </div>
      <div className='all-patients'>
        {patients?.map((patient, idx) => (
          <div key={idx} className='each-patient-profile'>
            <p>{patient.name}</p>
            <p>{patient.gender}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <div className='button-see-patient'>
              <Link
                href={`/doctor/dashboard/patients/${patient.id}`}
                className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded'
              >
                See patient
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
