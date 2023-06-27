'use client';

import AuthNavbar from '@/app/(components)/auth-navbar';
import { selectAuthState } from '../../../redux/features/auth-slice';
import { useSelector } from 'react-redux';

export default function PatientRegisterNavbar() {
  const authState = useSelector(selectAuthState);
  const state = authState ? 'logout' : 'login';
  return <AuthNavbar user={'patient'} auth={state} />;
}
