import Login from '@/app/(components)/login';
import Navbar from './navbar';

export default function DoctorLogin() {
  return (
    <>
      <Navbar />
      <Login user={'doctor'} />
    </>
  );
}
