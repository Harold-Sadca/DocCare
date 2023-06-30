/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import apiService from '@/services/APIservices';
import './profile.css';
import '../../css/globals.css';
import '../../css/patient.css';

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
    <main className='profile-box'>
      <div className='profile-box-patient'>
        <div className='about-patient'>
          <Image
            src={currentPatient.profilePicture as string}
            alt='patient-profile'
            width={150}
            height={150}
            className='profile-pic'
          ></Image>
          <h2>{currentPatient.name}</h2>
          <p>{calculateAge(currentPatient.dateOfBirth)} years old</p>
        </div>
        <div className='general-info'>
          <h3>General info:</h3>
          <p>Date of birth: {currentPatient.dateOfBirth}</p>
          <p>{currentPatient.gender}</p>
        </div>
        <div className='ilnesses'>
          <h3>Allergies:</h3>
          <div className='patient-profile-boxes'>
            <div>{currentPatient.allergies}</div>
          </div>
          <div className='checkup'>
            <h3>Last Checkup:</h3>
            <div className='patient-profile-boxes checkup-container'>
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
