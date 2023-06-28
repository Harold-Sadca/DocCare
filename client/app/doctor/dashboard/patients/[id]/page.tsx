'use client';

import { TypePatient } from '@/../server/types/types';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { calculateAge } from '@/app/helper';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PhoneOutlined } from '@ant-design/icons';

export default function Patient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [patient, setPatient] = useState({});
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const patients = currentDoctor.patients;
  const currentPatient = patients?.find((patient) => {
    return patient.id?.toString() == params.id;
  });
  console.log(currentPatient?.patientAppointments);
  return (
    <main>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <div className='patient'>
        <h2>patienttt</h2>
        <h2>{currentPatient?.name}</h2>
        <h2>
          {calculateAge(currentPatient?.dateOfBirth as string).toString()} years
          old
        </h2>

        <h2>
          <PhoneOutlined /> {currentPatient?.phoneNumber}
        </h2>
        <h2>{currentPatient?.dateOfBirth}</h2>
        <h2>Medications:</h2>
        <h2>{currentPatient?.medications}</h2>
        <h2>Next appointments:</h2>
        {currentPatient?.patientAppointments
          ?.filter(
            (appointment) =>
              appointment.doctor_id === currentDoctor.id &&
              !appointment.attended
          )
          .map((appointment, idx) => (
            <div key={idx}>
              <h2>{appointment.date}</h2>
              <h2>{appointment.date}</h2>
              <h2>{appointment.illness}</h2>
            </div>
          ))}
      </div>
    </main>
  );
}
