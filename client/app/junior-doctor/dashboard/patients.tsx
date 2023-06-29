'use client'

import { TypeAppointment, TypePatient } from "../../../../server/types/types";


export default function AllPatients({allPatients}) {
  const token = localStorage.getItem('accessToken');
  const userType = localStorage.getItem('userType') as string;


  function chatToPatient(e:React.MouseEvent<HTMLElement>) {
    if (e.target.name === 'patient-details') {
      //navigate to the patient details
      console.log('details')
    } else if (e.target.name === 'chat') {
      //set the selected patient
      console.log('chat')
    }
  }


  return (
    <main className='flex min-h-screen flex-col box-border'>
      {allPatients.map((patient:TypePatient) => {
        return (
          <>
            <h2 key={patient.id}>{patient.name}</h2>
            <button id={patient.id} name="patient-details" onClick={(e) => {chatToPatient(e)}}>Patient Details</button>
            <button id={patient.id} name="chat" onClick={(e) => {chatToPatient(e)}}>Chat</button>
            {/* <div>{patient.patientAppointments?.map((appointment:TypeAppointment) => {
              return <section key={appointment.id}>{appointment.date}</section>
            })}</div> */}
          </>
        )
      })}
    </main>
  );
}