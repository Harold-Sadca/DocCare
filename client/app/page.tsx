/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const userType = localStorage.getItem('userType') as string;
    if (userType) {
      router.push(`/${userType}/dashboard`);
    } else {
      router.push('/home');
    }
  }, []);
  return null;
}
