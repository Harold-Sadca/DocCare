'use client';

import './profile.css';
import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [message, setMessage] = useState('');
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );

  console.log(currentDoctor, 'hey from doctor profile');

  return (
    <main>
      <div className='profile'>
        <h1>Doctor page works</h1>
      </div>
    </main>
  );
}
