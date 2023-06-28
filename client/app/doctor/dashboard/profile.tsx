'use client';

import './profile.css';
import { useAppSelector } from '@/redux/store';
import apiService from '@/services/APIservices';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [message, setMessage] = useState('');
  const currentDoctor = useAppSelector(
    (state) => state.currentDoctorReducer.value
  );

  async function getAllPatients() {
    try {
      const allPatients = await apiService.getAllPatients();
      console.log(allPatients);
    } catch (error) {
      console.log(error);
    }
  }

  console.log('hey from auth navbar');

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <main>
      <div className='profile'>
        <h1>Doctor page works</h1>
      </div>
    </main>
  );
}
