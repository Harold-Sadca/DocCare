'use client'
import JuniorDoctorMessages from './messages';
import './dashboard.css'
import apiService from '@/services/APIservices';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setCurrentJunior } from '@/redux/features/junior-slice';
import { useEffect, useState } from 'react';
import { TUser } from '@/types/types';
import { TypeJuniorDoctor } from '../../../../server/types/types';

export default function JuniorDoctorDashBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const [junior, setJunior] = useState<TUser>()

  async function authenticate(token:string, userType:string) {
    const user = await apiService.getUser(token, userType);
    setJunior(user)
    dispatch(setCurrentJunior(user as TypeJuniorDoctor))
  }


  useEffect(() => {
    const token = localStorage.getItem('accessToken') as string;
    const userType = localStorage.getItem('userType') as string;
    if (token && userType === 'junior-doctor') {
      authenticate(token, userType)
    }
    
  }, [])
  
  return (
    <main>
      <h1>Junior DashBoard!</h1>
      <div className='chat-box'>
      <JuniorDoctorMessages currentJunior={junior}/>
      </div>
    </main>
  );
  }
  