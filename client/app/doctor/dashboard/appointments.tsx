'use client';

import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './appointments.css'

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;
  console.log(appointments);

  return (
    <main>
      <div className='appointments-container'>
      <h2>My appointments</h2>
      <div className='appointment-list'>
      <div className='appointment-list-container'>

        {appointments?.slice(0, 3).map((appointment, idx) => (
          <div key={idx}  className='each-appointment'>
            <div className='about-patient'>
            <p id='name'>{appointment.patientAppointment?.name}</p>
            <p id='gender'>{appointment.patientAppointment?.gender}</p> 
            </div>
            <div className='time-of-appointment'>           
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            </div>
          </div>
        ))}
         </div>
         <div className='see-more'>
        <Link
          href='/doctor/dashboard/appointments'
          className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded'
          // onClick={() => router.push('/doctor/dashboard/patients')}
        >
          See all
        </Link>
        </div>
      </div>
      </div>
    </main>
  );
}
