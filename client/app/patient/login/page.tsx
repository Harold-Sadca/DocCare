import Login from '@/app/(components)/login';
import AuthNavbar from '@/app/(components)/auth-navbar';

export default function PatientLogin() {
  return (
    <>
      <AuthNavbar user={'patient'} auth={'register'} />
      <Login user={'patient'} />
    </>
  );
}
