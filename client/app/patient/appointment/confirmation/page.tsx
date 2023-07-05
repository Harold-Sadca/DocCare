/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import AuthNavbar from '@/app/(components)/auth-navbar';
import '../../../css/patient.css';
import '../../../css/globals.css';
import { useAppSelector } from '@/redux/store';
import apiService from '@/services/APIservices';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AvailableDoctorList() {
  const router = useRouter();

//   router.push('/patient/dashboard');
 
  return (
    <div>
      <AuthNavbar user={'patient'} auth={'login'} />
    <h1>Helloo</h1>
    <button>   
    
    </button>
    </div>
  );
}