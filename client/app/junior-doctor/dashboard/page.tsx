/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import JuniorDoctorMessages from './messages';
import './dashboard.css';
import apiService from '@/services/APIservices';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setCurrentJunior } from '@/redux/features/junior-slice';
import { useEffect, useState } from 'react';
import { TUser } from '@/types/types';
import { TypeJuniorDoctor, TypePatient } from '../../../../server/types/types';
import AllPatients from './patients';

export default function JuniorDoctorDashBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const [junior, setJunior] = useState<TUser>();
  const [allPatients, setAllPatients] = useState<TypePatient[]>([]);

  async function authenticate(token: string, userType: string) {
    const user = await apiService.getUser(token, userType);
    setJunior(user);
    console.log(user);
    dispatch(setCurrentJunior(user as TypeJuniorDoctor));
  }

  console.log(allPatients);

  async function getPatients(token: string) {
    const patients = await apiService.getAllPatients(token);
    setAllPatients(patients as TypePatient[]);
  }

  useEffect(() => {
    const token =
      typeof window !== 'undefined' &&
      (localStorage.getItem('accessToken') as string);
    const userType =
      typeof window !== 'undefined' &&
      (window.localStorage.getItem('userType') as string);
    if (token && userType === 'junior-doctor') {
      authenticate(token, userType);
      getPatients(token);
    }
  }, []);

  return (
    <main>
      <h1>Junior DashBoard!</h1>
      <AllPatients allPatients={allPatients} />
      <div className='chat-box'>
        <JuniorDoctorMessages currentJunior={junior as TUser} />
      </div>
    </main>
  );
}
