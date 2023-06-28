'use client';

import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;
  console.log(appointments);

  return (
    <main>
      <h2>My appointments</h2>
      <div className='patients'>
        {appointments?.slice(0, 3).map((appointment, idx) => (
          <div key={idx}>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
          </div>
        ))}
        <Link
          href='/doctor/dashboard/appointments'
          className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded'
          // onClick={() => router.push('/doctor/dashboard/patients')}
        >
          See all
        </Link>
      </div>
    </main>
  );
}
