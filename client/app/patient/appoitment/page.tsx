import AuthNavbar from '@/app/(components)/auth-navbar';
import "./appoitment-dashboard.css"

export default function PatientAppoitment() {
    return (
      <main className='patient-appoitment-main'>
         <AuthNavbar user={'patient'} auth={'login'} />
         {/* change the navbar to the correct info  */}
        <h1>Make an Appoitment</h1>
        <img src='/1.png' className='icon'/>
        <img src='/2.png' className='icon'/>
        <img src='/3.png' className='icon'/>
      </main>
    );
  }
  