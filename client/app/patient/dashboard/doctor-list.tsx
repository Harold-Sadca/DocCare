'use client';
import { useAppSelector } from '@/redux/store';
import './doctor-list.css';
import Image from 'next/image';

export default function DoctorList() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const patientAppointments = currentPatient.patientAppointments;
  const doctorIds = [] as string[];
  return (
    <main>
      <div className='doctor-list-container'>
        <h1>Your Doctors</h1>
        <div className='doctor-list'>
          {patientAppointments?.map((appointment, idx) => {
            const doctorId = appointment.doctorAppointment?.id;
            if (doctorId && !doctorIds.includes(doctorId)) {
              doctorIds.push(doctorId);
              return (
                <div className='each-doctor' key={idx}>
                  <Image
                    src={
                      appointment.doctorAppointment?.profilePicture as string
                    }
                    alt='Doctor Profile'
                  ></Image>
                  <div className='each-doctor-name'>
                    <h2>{appointment.doctorAppointment?.name}</h2>
                    <p>{appointment.doctorAppointment?.specialisation}</p>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </main>
  );
}
