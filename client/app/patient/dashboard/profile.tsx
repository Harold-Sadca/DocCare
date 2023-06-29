/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import apiService from '@/services/APIservices';
import './profile.css';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { TypePatient } from '../../../../server/types/types';
import Image from 'next/image';

export default function Profile() {
  const [message, setMessage] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [illness, setIllness] = useState('');
  const [patient, setPatient] = useState<TypePatient>();
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );

  console.log(currentPatient);

  function calculateAge(dateOfBirth: string) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  async function lastCheckup() {
    await apiService
      .getLastCheckup(currentPatient.id as string)
      .then((messageAndResult) => {
        if (!messageAndResult.result)
          setMessage(messageAndResult.message as string);
        else {
          setLastDate(messageAndResult.result.lastDate.date);
          setIllness(messageAndResult.result.lastDate.illness);
        }
      });
  }

  useEffect(() => {
    lastCheckup();
  }, [currentPatient]);

  return (
    <main>
      <div className='profile'>
        <div className='about-patient'>
          <div className='profile-pic'>
            {/* <img src='https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'></img> */}
            <Image
              src={currentPatient.profilePicture as string}
              alt='patient-profile'
            ></Image>
          </div>
          <h1>{currentPatient.name}</h1>
          <p>{calculateAge(currentPatient.dateOfBirth)} years old</p>
        </div>
        <div className='general-info'>
          <h2>General info:</h2>
          <p>Date of birth: {currentPatient.dateOfBirth}</p>
          <p>{currentPatient.gender}</p>
        </div>
        <div className='ilnesses'>
          <h3>Allergies:</h3>
          <div className='each-illness'>
            <div>{currentPatient.allergies}</div>
          </div>
          <div className='checkup'>
            <h4>Last Checkup:</h4>
            <div className='checkup-container'>
              <p className='date'>{lastDate}</p>
              <div className='doctor-notes'>
                <p>{message}</p>
                <p>{illness}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
