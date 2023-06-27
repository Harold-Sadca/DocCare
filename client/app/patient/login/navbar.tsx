'use client';

import { selectAuthState } from '../../../redux/features/auth-slice';
import { useSelector } from 'react-redux';
import AuthNavbar from '@/app/(components)/auth-navbar';

export default function PatientLoginNavbar() {
  const authState = useSelector(selectAuthState);
  const state = authState ? 'logout' : 'register';

  return <AuthNavbar user={'patient'} auth={state} />;
}
