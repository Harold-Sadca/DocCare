'use client';

import { TypePatient } from '@/../server/types/types';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;
  // const patients = currentDoctor.patients;
  const patientsWithAppointment = [] as TypePatient[];

  currentDoctor.patients?.map((pat) => {
    if (appointments?.some((appointment) => appointment.patient_id === pat.id))
      patientsWithAppointment.push(pat);
  });
  console.log(appointments);
  console.log({ patientsWithAppointment });

  return (
    <main>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <h2>All my appointments:</h2>
      <div className='patients'>
        {appointments?.map((appointment, idx) => (
          <div key={idx}>
            <p>Patient name</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
