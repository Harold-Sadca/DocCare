'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';

export default function PatientRegisterNavbar() {
  return <AuthNavbar user={'patient'} auth={'login'} />;
}
