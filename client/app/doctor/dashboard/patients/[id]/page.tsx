'use client';

import { TypePatient } from '@/../server/types/types';
import AuthNavbar from '@/app/(components)/auth-navbar';
import { calculateAge } from '@/app/helper';
import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import './each-patient-profile.css'

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
        <img src='https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' className='profile-image-patient'/>
        <div className='all-info-about-patient'>
          <div className='main-info-patient'>
        <h2 id='name'>{currentPatient?.name}</h2>
        <h2 id='age'>
          {calculateAge(currentPatient?.dateOfBirth as string).toString()} years
          old
        </h2>
         <p id='gender'>{currentPatient?.gender}</p>
        <div className='phone-call'> 
       <a href={`tel:${currentPatient?.phoneNumber}`}>
      {currentPatient?.phoneNumber}
      <PhoneOutlined style={{ fontSize: '30px' }} />
         </a>
        </div>
        </div>
        <h2>{currentPatient?.dateOfBirth}</h2>
        <h2>Medications:</h2>
        <h2>{currentPatient?.medications.toString()}</h2>
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
      </div>
    </main>
  );
}
