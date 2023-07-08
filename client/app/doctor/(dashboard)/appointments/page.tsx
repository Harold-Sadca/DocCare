/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';
import { calculateAge, formatDate } from '@/app/helper';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { LeftCircleOutlined } from '@ant-design/icons';
import '../../../css/doctor.css';
import '../../../css/globals.css';

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;

  return (
    <div className='patients-box'>
      <AuthNavbar user={'doctor'} auth={'login'} />
      <div>
        <div className='button-and-title'>
          <button onClick={() => router.back()}>
            <LeftCircleOutlined />
          </button>
          <h2 className='text-2xl text-primary text-black m-4'>
            Next appointments
          </h2>
        </div>
        {appointments
          ?.filter(
            (appointment) =>
              new Date(`${appointment.date}`).valueOf() >= Date.now().valueOf()
          )
          .map((appointment, idx) => (
            <div className='each-patient-profile' key={idx}>
              <p>{appointment?.patientAppointment?.name}</p>
              <p>
                {calculateAge(
                  appointment?.patientAppointment?.dateOfBirth as string
                ).toString()}{' '}
                years old
              </p>
              <p>{appointment?.patientAppointment?.gender}</p>
              <p>
                <span> Summary: </span>{' '}
                {appointment?.patientAppointment?.summary}
              </p>
              <p>
                <span>Appointment</span>
              </p>
              <p> Date: {formatDate(appointment.date)}</p>
              <p>Time: {appointment.time.slice(0, 5)}</p>
            </div>
          ))}
        <h2 className='text-2xl text-primary text-black m-4'>
          Previous appointments
        </h2>
        {appointments
          ?.filter(
            (appointment) =>
              new Date(`${appointment.date}`).valueOf() < Date.now().valueOf()
          )
          .map((appointment, idx) => (
            <div
              className='each-patient-profile previous-appointments'
              key={idx}
            >
              <p>{appointment?.patientAppointment?.name}</p>
              <p>
                {calculateAge(
                  appointment?.patientAppointment?.dateOfBirth as string
                ).toString()}
                years old
              </p>
              <p>{appointment?.patientAppointment?.gender}</p>
              <p>
                <span> Summary: </span>{' '}
                {appointment?.patientAppointment?.summary}
              </p>
              <p>
                <span>Appointment</span>
              </p>
              <p> Date: {formatDate(appointment.date)}</p>
              <p>Time: {appointment.time.slice(0, 5)}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
