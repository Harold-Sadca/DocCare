'use client';
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import Image from 'next/image';

export default function Profile() {
  const [message, setMessage] = useState('');
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );

  return (
    <main className='profile-box'>
      <div className='dashboard-container'>
        <div className='about-user'>
          <Image
            src='https://images.pexels.com/photos/12495583/pexels-photo-12495583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            alt='doctor-image'
            height={150}
            width={150}
            className='profile-pic'
          ></Image>
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
