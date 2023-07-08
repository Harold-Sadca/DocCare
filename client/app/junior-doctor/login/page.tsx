'use client';
import React from 'react';
import Login from '@/app/(components)/login';
import AuthNavbar from '@/app/(components)/auth-navbar';

export default function JuniorDoctorLogin() {
  return (
    <>
      <AuthNavbar user={'junior-doctor'} auth={'register'} />
      <Login user={'junior-doctor'} />
    </>
  );
}
