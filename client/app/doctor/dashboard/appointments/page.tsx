/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';
import { calculateAge } from '@/app/helper';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import '../../../css/doctor.css';
import '../../../css/globals.css';

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;
  console.log(appointments);

  return (
    <div className='appointments-box'>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <main className='all-patients appointment-list-container'>
        <h2>Next appointments</h2>
        {appointments
          ?.filter((appointment) => !appointment.attended)
          .map((appointment, idx) => (
            <div className='each-patient-profile' key={idx}>
              <div className='each-appointment appoinment-list'>
                <div className='about-user-appointment'>
                  <p>{appointment?.patientAppointment?.name}</p>
                  <p>
                    {calculateAge(
                      appointment?.patientAppointment?.dateOfBirth as string
                    ).toString()}{' '}
                    years old
                  </p>
                  <p>{appointment?.patientAppointment?.gender}</p>
                  <p>Summary: {appointment?.patientAppointment?.summary}</p>
                </div>
                <div className='appoitment-patient'>
                  <h3>Appoitment</h3>
                  <p> Date: {appointment.date}</p>
                  <p>Time: {appointment.time.slice(0, 5)}</p>
                </div>
              </div>
            </div>
          ))}
        <h2>Previous appointments</h2>
        {appointments
          ?.filter((appointment) => appointment.attended)
          .map((appointment, idx) => (
            <div className='appoinment-list attended' key={idx}>
              <div className='each-appointment'>
                <div className='about-patient'>
                  <p id='name'>{appointment?.patientAppointment?.name}</p>
                  <p>
                    {' '}
                    {calculateAge(
                      appointment?.patientAppointment?.dateOfBirth as string
                    ).toString()}{' '}
                    years old
                  </p>
                  <p>{appointment?.patientAppointment?.gender}</p>
                  <p>Summary: {appointment?.patientAppointment?.summary}</p>
                </div>
                <div className='appoitment-patient'>
                  <h3>Appoitment</h3>
                  <p> Date: {appointment.date}</p>
                  <p>Time: {appointment.time.slice(0, 5)}</p>
                </div>
              </div>
            </div>
          ))}
      </main>
      <img src='/appointment-vector.png' id='appointment-vector'></img>
    </div>
  );
}
