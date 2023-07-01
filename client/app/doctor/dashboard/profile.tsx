'use client';
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import Image from 'next/image';

export default function Profile() {
  const [message, setMessage] = useState('');
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );
  console.log('hello from doctor page');
  console.log(currentDoctor);
  return (
    <main className='profile-box'>
      <div className='dashboard-container margin-right-4'>
        <div className='about-user'>
          {currentDoctor.profilePicture && (
            <Image
              src={currentDoctor.profilePicture as string}
              alt='doctor-profile'
              height={150}
              width={150}
              className='profile-pic'
            ></Image>
          )}
          <h2>{currentDoctor.name}</h2>
        </div>
        <div className='general-info'>
          <p>{currentDoctor.specialisation}</p>
        </div>
        <h3>About</h3>
        <div className='profile-boxes profile-boxes-blue'>
          <p>{currentDoctor.about}</p>
        </div>
      </div>
    </main>
  );
}
