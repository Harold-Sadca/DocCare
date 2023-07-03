'use client';
import { formatDate, formatTime } from '@/app/helper';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';

export default function Appointments() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const patientAppointments = currentPatient.patientAppointments;
  const futureAppointments = patientAppointments?.filter((appointment) => {
    return new Date(`${appointment.date}`).valueOf() > Date.now().valueOf()
  })

  return (
    <main className='appointment-box'>
      <div className='dashboard-container appointment-container'>
        <h3>Upcoming Appointments:</h3>
        <div className='scroll-y'>
          {futureAppointments?.map((appointment, idx) => (
            <div className='list each-appointment' key={idx}>
              <Image
                src='/checkup-emoji.png'
                alt='checkup-emoji'
                width={100}
                height={100}
              ></Image>
              <div className='each-appointment-text'>
                <h2>{appointment.doctorAppointment?.name}</h2>
                <p>{formatDate(appointment.date)}</p>
                <p>{formatTime(appointment.time)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
