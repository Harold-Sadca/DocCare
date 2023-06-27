'use client';
import { useEffect } from 'react';
import Home from './home/page';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { login } from '../redux/features/auth-slice';
import apiService from '@/services/APIservices';
import { useDispatch } from 'react-redux';
import { setCurrentPatient } from '@/redux/features/patient-slice';
import { TypePatient } from '@/../server/types/types';
import Patient from './patient/page';

export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.authReducer.value.username);

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   const userType = localStorage.getItem('userType') as string;
  //   if (token) {
  //     console.log(token);
  //     console.log(userType);
  //     apiService.getUser(token, userType).then((user) => {
  //       console.log(user);
  //       console.log(userType);
  //       if (userType === 'patient') {
  //         const patient = user as TypePatient;
  //         console.log(patient);
  //         dispatch(setCurrentPatient(patient));
  //       }
  //       dispatch(login(user.name as string));
  //     });
  //   }
  // }, []);

  return (
    <main className='flex min-h-screen flex-col box-border'>
      <h1>Username: {username}</h1>
      <Home />
    </main>
  );
}
