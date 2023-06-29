'use client';
import { useAppSelector } from '@/redux/store';
import './appointments.css';

export default function Appointments() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const patientAppointments = currentPatient.patientAppointments;

  return (
    <main>
      <div className='apponitments-container'>
        <h1>Upcoming Appointments:</h1>
        <div className='appointment-list'>
          {patientAppointments.map((appointment, idx) => (
            <div className='appointment-list-container' key={idx}>
              <div className='each-appointment'>
                <img src='/checkup-emoji.png' />
                <div className='each-appointment-text'>
                  <h2>{appointment.doctorAppointment?.name}</h2>
                  <p>{appointment.date}</p>
                  <p>{appointment.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
