'use client';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';

export default function Appointments() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const patientAppointments = currentPatient.patientAppointments;

  return (
    <main className='appointment-box'>
      <div className='dashboard-container appointment-container'>
        <h3>Upcoming Appointments:</h3>
        <div className='scroll-y'>
          {patientAppointments?.map((appointment, idx) => (
            <div className='list each-appointment' key={idx}>
              <Image
                src='/checkup-emoji.png'
                alt='checkup-emoji'
                width={100}
                height={100}
              ></Image>
              <div className='each-appointment-text'>
                <h2>{appointment.doctorAppointment?.name}</h2>
                <p>{appointment.date}</p>
                <p>{appointment.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
