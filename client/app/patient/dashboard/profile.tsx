/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import apiService from '@/services/APIservices';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';

export default function Profile() {
  const [message, setMessage] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [illness, setIllness] = useState('');
  const currentPatient = useAppSelector(
    (state) => state.currentPatientReducer.value
  );

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
      <div className='dashboard-container'>
        <div className='profile-pic'>
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
