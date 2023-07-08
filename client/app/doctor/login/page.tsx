import Login from '@/app/(components)/login';
import AuthNavbar from '@/app/(components)/auth-navbar';

export default function DoctorLogin() {
  return (
    <>
      <AuthNavbar user={'doctor'} auth={'register'} />
      <Login user={'doctor'} />
    </>
  );
}
