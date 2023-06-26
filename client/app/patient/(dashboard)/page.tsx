import './dashboard.css'
import Profile from './profile';
import Appoitments from './appointments';

export default function Patient() {
  return (
    <main>
    <Profile/>
    <div className='appoitments-box'>
    <Appoitments/>
    </div>
    </main>
  );
}
