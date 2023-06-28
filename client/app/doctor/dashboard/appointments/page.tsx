'use client';

import { TypePatient } from '@/../server/types/types';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { calculateAge } from '@/app/helper';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;

  return (
    <main>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <h2>All my appointments:</h2>
      <div className='patients'>
        {appointments?.map((appointment, idx) => (
          <div key={idx}>
            <p>Patient: {appointment?.patientAppointment?.name}</p>
            <p>
              {' '}
              {calculateAge(
                appointment?.patientAppointment?.dateOfBirth as string
              ).toString()}{' '}
              years old
            </p>
            <p>{appointment?.patientAppointment?.gender}</p>
            <p>Summary: {appointment?.patientAppointment?.summary}</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
