'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';

export default function PatientLoginNavbar() {
  return <AuthNavbar user={'patient'} auth={'register'} />;
}
