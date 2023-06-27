'use client';
import { useEffect } from 'react';
import Home from './home/page';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { login } from '../redux/features/auth-slice';
import apiService from '@/services/APIservices';
import { useDispatch } from 'react-redux';

export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.authReducer.value.username);

  const isPatient = useAppSelector(
    (state) => state.authReducer.value.isJuniorDoctor
  );
  const isJuniorDoctor = useAppSelector(
    (state) => state.authReducer.value.isPatient
  );

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userType = localStorage.getItem('userType') as string;
    console.log(token);
    if (token)
      apiService.getUser(token, userType).then((user) => {
        dispatch(login(user.name as string));
      });
  }, []);
  return (
    <main className='flex min-h-screen flex-col box-border'>
      <h1>Username: {username}</h1>

      <Home />
    </main>
  );
}
