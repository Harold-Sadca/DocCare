'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';

export default function DoctorLoginNavbar() {
  return <AuthNavbar user={'doctor'} auth={'register'} />;
}
