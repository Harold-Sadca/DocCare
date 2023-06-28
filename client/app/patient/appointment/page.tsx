import AuthNavbar from '@/app/(components)/auth-navbar';
import { Montserrat } from 'next/font/google';
import './appointment-dashboard.css';

const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
});

export default function PatientAppoitment() {
  return (
    <main className='patient-appoitment-main'>
      <AuthNavbar user={'patient'} auth={'login'} />
      {/* change the navbar to the correct info  */}
      <h1 className='appoitment-heading'>Make an Appoitment</h1>
      <div className='steps'>
        <div className='Consultation-1'>
          <img src='/1.png' className='icon' />
          <div>
            <h2>Request Consultation</h2>
            <p>Describe your Illness and choose the Date</p>
          </div>
        </div>
        <div className='Doctor-2'>
          <img src='/2.png' className='icon' />
          <div>
            <h2>Find a Doctor</h2>
            <p>
              Find a Doctor Related to the disease you are suffering from to get
              the best consultation.
            </p>
          </div>
        </div>
        <div className='Solution-3'>
          <img src='/3.png' className='icon' />
          <div>
            <h2>Get a Solution</h2>
            <p>
              Our Doctor will give you a solution regarding the illness you're
              suffering from.
            </p>
          </div>
        </div>
      </div>
      <div className='female-doctor'>
        <img src='/Female-Doctor-PNG-Image.png' />
      </div>
    </main>
  );
}
