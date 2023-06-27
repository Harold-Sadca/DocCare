'use client';
import Home from './home/page';
import { useAppSelector } from '@/redux/store';

export default function Main() {
  const username = useAppSelector((state) => state.authReducer.value.username);
  const isDoctor = useAppSelector((state) => state.authReducer.value.isDoctor);
  const isPatient = useAppSelector(
    (state) => state.authReducer.value.isJuniorDoctor
  );
  const isJuniorDoctor = useAppSelector(
    (state) => state.authReducer.value.isPatient
  );
  return (
    <main className='flex min-h-screen flex-col box-border'>
      <h1>Username: {username}</h1>
      {isDoctor && <h1>This is a Doctor</h1>}
      <Home />
    </main>
  );
}
