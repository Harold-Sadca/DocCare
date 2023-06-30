'use client';

import { AppDispatch } from '@/redux/store';
import { TypePatient } from '../../../../server/types/types';
import { useDispatch } from 'react-redux';
import { setChatPatient } from '@/redux/features/chat-patient-slice';
import { useRouter } from 'next/navigation';

interface Props {
  allPatients: TypePatient[];
}
export default function AllPatients({ allPatients }: Props) {
  // const token = typeof window !== 'undefined' && localStorage.getItem('accessToken');
  // const userType = typeof window !== 'undefined' &&  localStorage.getItem('userType') as string;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  function chatToPatient(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    if (target.name === 'patient-details') {
      //navigate to the patient details
      router.push(`dashboard/patient/${target.id}`);
    } else if (target.name === 'chat') {
      //set the selected patient
      console.log('chat');
      const patientToChat = {
        id: target.id,
        name: target.title,
      };
      console.log(patientToChat);
      dispatch(setChatPatient(patientToChat));
    }
  }

  return (
    <main className='flex min-h-screen flex-col box-border'>
      {allPatients.map((patient: TypePatient) => {
        return (
          <div key={patient.id}>
            <h2>{patient.name}</h2>
            <button
              id={patient.id}
              name='patient-details'
              title={patient.name}
              onClick={(e) => {
                chatToPatient(e);
              }}
            >
              Patient Details
            </button>
            <button
              id={patient.id}
              title={patient.name}
              name='chat'
              onClick={(e) => {
                chatToPatient(e);
              }}
            >
              Chat
            </button>
            {/* <div>{patient.patientAppointments?.map((appointment:TypeAppointment) => {
              return <section key={appointment.id}>{appointment.date}</section>
            })}</div> */}
          </div>
        );
      })}
    </main>
  );
}
