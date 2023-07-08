/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import apiService from '@/services/APIservices';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { calculateAge } from '@/app/helper';
import Image from 'next/image';

export default function Profile() {
  const [message, setMessage] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [illness, setIllness] = useState('');
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );

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
      <div className='dashboard-container'>
        <div>
          {currentPatient.profilePicture && (
            <Image
              src={currentPatient.profilePicture as string}
              alt='doctor-profile'
              height={150}
              width={150}
              className='profile-pic'
            ></Image>
          )}

          <h2>{currentPatient.name}</h2>
          <p>{calculateAge(currentPatient.dateOfBirth)} years old</p>
        </div>
        <div className='general-info'>
          <h3>General info:</h3>
          <p>Date of birth: {currentPatient.dateOfBirth}</p>
          <p>{currentPatient.gender}</p>
        </div>
        <div className='patient-info'>
          <h3>Allergies:</h3>
          <div className='profile-boxes'>
            <div>{currentPatient.allergies}</div>
          </div>
          <div className='patient-info'>
            <h3>Last Checkup:</h3>
            <div className='profile-boxes profile-boxes-blue'>
              <p className='date'>{lastDate}</p>
              <div className='doctor-notes'>
                <p></p>
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
