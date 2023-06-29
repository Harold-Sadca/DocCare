'use client';

import './profile.css';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { calculateAge } from '@/app/helper';
import Image from 'next/image';

export default function Profile() {
  const [message, setMessage] = useState('');
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );

  return (
    <main>
      <div className='profile'>
        <div className='about-patient'>
          <div className='profile-pic'>
            <Image
              src='https://images.pexels.com/photos/12495583/pexels-photo-12495583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              alt='doctor-image'
            ></Image>
          </div>
          <h1>{currentDoctor.name}</h1>
        </div>
        <div className='general-info'>
          <p>{currentDoctor.gender}</p>
        </div>
        <h2>About</h2>
        <div className='checkup-container'>
          <p>{currentDoctor.about}</p>
        </div>
      </div>
    </main>
  );
}
