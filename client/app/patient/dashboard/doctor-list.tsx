'use client';
import { useAppSelector } from '@/redux/store';
import Image from 'next/image';

export default function DoctorList() {
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );
  const patientAppointments = currentPatient.patientAppointments;
  const doctorIds = [] as string[];
  return (
    <main className='doctor-list-box'>
      <div className='dashboard-container list-container'>
        <h3>Your Doctors</h3>
        <div className='scroll-y'>
          {patientAppointments?.map((appointment, idx) => {
            const doctorId = appointment.doctorAppointment?.id;
            if (doctorId && !doctorIds.includes(doctorId)) {
              doctorIds.push(doctorId);
              return (
                <div className='each-doctor list' key={idx}>
                  <Image
                    src={
                      appointment.doctorAppointment?.profilePicture as string
                    }
                    alt='Doctor Profile'
                    width={70}
                    height={70}
                  ></Image>
                  <div className='each-doctor-name'>
                    <h3>{appointment.doctorAppointment?.name}</h3>
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
