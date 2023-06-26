import Login from '@/app/(components)/login';
import Navbar from './navbar';

export default function PatientLogin() {
  return (
    <>
      <Navbar />
      <Login user={'patient'} />
    </>
  );
}
