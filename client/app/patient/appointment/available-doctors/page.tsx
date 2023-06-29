'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import './available-doctors.css';
import { useAppSelector } from '@/redux/store';
import apiService from '@/services/APIservices';
import { IllnessOptions } from '../../../../../server/types/types';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TypeResponseAppointment } from '@/types/types';

export default function AvailableDoctorList() {
  const router = useRouter();
  const availableSpecialists = useAppSelector(
    (state) => state.AvailableSpecialist.value
  );
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );

  console.log(availableSpecialists);
  // when choose the slot
  // function makeAppointment(stateMonth: number, stateDay: number, time: number) {
  //   // time is the id of the button
  //   // pass the day and the time slot
  //   // backend: go to the doctor, availability and
  //   // availability.day.push(time slot)
  // }

  async function makeAppointment(
    date: string,
    time: string,
    illness: IllnessOptions,
    doctorId: string
  ) {
    console.log(time);
    // createAppointment(patiendId, appointment)
    const appointment = {
      date,
      time: `0${time}:00`,
      illness,
      attended: false,
    };
    if (currentPatient && currentPatient.id) {
      const data = await apiService.createAppointment(
        currentPatient.id,
        appointment,
        doctorId
      );
      console.log(data);
      const { message, result, error } = data as TypeResponseAppointment;
      console.log(data);
      console.log(result);
      if (error) {
        setMessageContent(error);
      } else {
        if (result) {
          console.log(result);
          setMessageContent(message as string);
        }
      }
    }
  }

  function availableSlots(slots: number[]) {
    const filledSlots = [] as number[];
    for (let slot = 9; slot <= 17; slot++) {
      filledSlots.push(slot);
    }
    if (slots.length === 0) {
      return filledSlots;
    } else {
      const unavailableSlots = [...slots] as number[];
      const newSlots = filledSlots.filter((slot) => {
        if (!unavailableSlots.includes(slot)) {
          return slot;
        }
      });
      return newSlots;
    }
    // return showSlots;
  }

  const [messageApi, contextHolder] = message.useMessage();
  const [messageContent, setMessageContent] = useState('');
  const key = 'updatable';

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: messageContent,
        duration: 2,
      });
      setTimeout(() => {
        router.push('/patient/dashboard');
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (messageContent) {
      openMessage();
    }
  }, [messageContent]);

  // availableSpecialists

  // currentSpecialists
  // in the return:
  // currentSpecialists.map((currSpecialist, idx) => {
  // const slot = currSpecialist.
  // return(
  // <div key={idx}>
  // <h2>{currSpecialist.name}</h2>
  // <p>{currSpecialist.specialisation}</p>
  // <button onClick={()=> chooseSlot()} id={slot}>{slot}:00</button>
  // </div>
  // )})
  return (
    <main>
      <AuthNavbar user={'patient'} auth={'login'} />
      {contextHolder}
      <div className='doctor-list-container'>
        <h1>Your Doctors</h1>
        <div className='doctor-list'>
          {availableSpecialists.map((available, idx) => {
            const doctorName = available.doctorName;
            const doctorId = available.doctorId;
            const doctorAbout = available.doctorAbout;
            const doctorProfilePic = available.doctorProfilePic;
            const illness = available.illness as IllnessOptions;
            const date = available.date;
            const slots = availableSlots(available.slots);
            return (
              <div className='each-doctor' key={idx}>
                <img src='https://images.pexels.com/photos/4270088/pexels-photo-4270088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img>
                <img src={doctorProfilePic}></img>
                <div className='each-doctor-name'>
                  <h2>{doctorName}</h2>
                  <p>{doctorAbout}</p>
                  {slots.map((slot, idx) => (
                    <div key={idx}>
                      <button
                        id={slot.toString()}
                        onClick={() =>
                          makeAppointment(
                            date,
                            slot.toString(),
                            illness,
                            doctorId
                          )
                        }
                      >
                        {slot}:00
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
