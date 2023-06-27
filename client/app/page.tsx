'use client';
import { useEffect, useState } from 'react';
import Home from './home/page';
import Patient from './patient/(dashboard)/page';
import Doctor from './doctor/(dashboard)/page';
import JuniorDoctor from './junior-doctor/(dashboard)/page';
import { useRouter } from 'next/navigation';

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem('userType') as string;
    if (userType) {
      router.push(`/${userType}`);
    } else {
      router.push('/home');
    }
  }, []);
  return null;
}
