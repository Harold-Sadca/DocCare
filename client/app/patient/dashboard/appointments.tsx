'use client';
import { useAppSelector } from '@/redux/store';
import '../../css/patient.css';
import '../../css/globals.css';
import Image from 'next/image';

export default function Appointments() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const patientAppointments = currentPatient.patientAppointments;

  return (
    <main className='patient-dashboard-container appointment-box'>
      <h3>Upcoming Appointments:</h3>
      <div className='list appointment-list'>
        {patientAppointments?.map((appointment, idx) => (
          <div className='each-appointment' key={idx}>
            <Image
              src='/checkup-emoji.png'
              alt='checkup-emoji'
              width={100}
              height={100}
            ></Image>
            <div className='each-appointment-text'>
              <h3>{appointment.doctorAppointment?.name}</h3>
              <p>{appointment.date}</p>
              <p>{appointment.time}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
