'use client';

import { useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckSquareTwoTone, FieldTimeOutlined } from '@ant-design/icons';

export default function Appointments() {
  const router = useRouter();
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  const appointments = currentDoctor.doctorAppointments;
  console.log(appointments);

  function handleAttendAppointment(patientId: string) {
    console.log(' clicked');
    console.log(patientId);
    appointments?.map((appointment) => {
      if (appointment.id === patientId) return (appointment.attended = true);
    });
  }

  return (
    <main className='doctor-appointments-box'>
      <div className='dashboard-container doctor-patients-container'>
        <h3>My appointments</h3>
        {appointments?.slice(0, 3).map((appointment, idx) => (
          <div
            key={idx}
            className='profile-boxes profile-boxes-blue each-item each-item-appointments'
          >
            <span
              className='attend-btn'
              onClick={() => handleAttendAppointment(appointment.id as string)}
            >
              <CheckSquareTwoTone />
            </span>
            <div className='about-user'>
              <p>{appointment.patientAppointment?.name}</p>
              <p>{appointment.patientAppointment?.gender}</p>
            </div>
            <div className='time-of-appointment'>
              <p>{appointment.date}</p>
              <p>
                {' '}
                <FieldTimeOutlined /> {appointment.time.slice(0, 5)}
              </p>
            </div>
          </div>
        ))}
        <Link
          href='/doctor/dashboard/appointments'
          className='bg-transparent hover:bg-tertiary text-tertiary-dark font-semibold hover:text-white py-2 px-4 my-2 border border-tertiary hover:border-transparent rounded btn-see-all'
        >
          See all
        </Link>
      </div>
    </main>
  );
}
