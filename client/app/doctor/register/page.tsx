'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';

export default function DoctorRegisterNavbar() {
  return <AuthNavbar user={'doctor'} auth={'login'} />;
}
