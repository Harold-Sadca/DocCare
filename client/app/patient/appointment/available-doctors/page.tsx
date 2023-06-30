/* eslint-disable react-hooks/exhaustive-deps */
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
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import Image from 'next/image';

export default function AvailableDoctorList() {
  const router = useRouter();
  const [formError, setFormError] = useState('');
  const availableSpecialists = useAppSelector(
    (state) => state.AvailableSpecialist.value
  );
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );

  console.log(availableSpecialists);

  async function makeAppointment(
    date: string,
    time: string,
    illness: IllnessOptions,
    doctorId: string
  ) {
    console.log(time);
    const appointment = {
      date,
      time: `0${time}:00`,
      illness,
      attended: false,
    };
    if (currentPatient && currentPatient.id) {
      console.log(currentPatient);
      const data = await apiService.createAppointment(
        currentPatient.id,
        appointment,
        doctorId
      );
      console.log(data);
      if (currentPatient && currentPatient.id) {
        console.log(currentPatient);
        const data = await apiService.createAppointment(
          currentPatient.id,
          appointment,
          doctorId
        );
        const { message, result } = data;
        console.log(data);
        if (result) {
          setMessageContent(message as string);
          setFormError('');
        } else {
          setFormError(`${data}`);
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
                {/* <Image src={doctorProfilePic} alt={doctorProfilePic}
                 height={150}
                 width={150}
                ></Image> */}
                <div className='each-doctor-name'>
                  <h2>{doctorName}</h2>
                  <p>{doctorAbout}</p>
                  {formError && (
                    <p className='error-message'>
                      <ExclamationCircleTwoTone /> {formError}
                    </p>
                  )}
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
